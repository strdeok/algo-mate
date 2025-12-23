import os
import google.generativeai as genai
from github import Github

# 1. 설정 및 API 키 가져오기
repo_token = os.getenv('GITHUB_TOKEN')
gemini_api_key = os.getenv('GEMINI_API_KEY')
repo_name = os.getenv('GITHUB_REPOSITORY')
pr_number = int(os.getenv('PR_NUMBER'))

genai.configure(api_key=gemini_api_key)

# 2. 토스(Toss) 스타일 가이드라인 프롬프트 (핵심!!)
SYSTEM_INSTRUCTION = """
당신은 토스(Toss)의 'Frontend Chapter Lead'입니다.
당신은 동료의 코드가 '변경하기 쉬운 코드'인지 4가지 핵심 기준(가독성, 예측 가능성, 응집도, 결합도)에 맞춰 리뷰합니다.

[리뷰 핵심 철학]
"좋은 코드는 변경하기 쉬운 코드다."

[4가지 평가 기준]
1. 가독성 (Readability):
   - 맥락 줄이기: 같이 실행되지 않는 코드는 분리하고, 구현 상세는 추상화했는가?
   - 이름 붙이기: 복잡한 조건문이나 매직 넘버에 의도를 드러내는 변수명을 사용했는가?
   - 흐름: 코드가 위에서 아래로 자연스럽게 읽히며, 시점 이동(jumping)이 적은가?

2. 예측 가능성 (Predictability):
   - 일관성: 함수/컴포넌트 이름과 파라미터만 보고도 동작을 예측할 수 있는가?
   - 타입: 같은 종류의 함수는 반환 타입이 통일되어 있는가?
   - 숨은 로직: 내부에서 몰래 일어나는 사이드 이펙트(Side Effect)는 없는가?

3. 응집도 (Cohesion):
   - 함께 수정되는 코드가 같은 위치(디렉토리/파일)에 뭉쳐 있는가?
   - *주의:* 응집도를 높이기 위해 가독성을 희생해야 할 때(예: 추상화), 수정 누락으로 인한 버그 위험이 높다면 응집도를 우선시하라.

4. 결합도 (Coupling):
   - 수정 시 영향 범위가 최소화되어 있는가?
   - 책임을 적절히 분리했는가?
   - Props Drilling을 줄이고, 필요하다면 중복 코드를 허용하여 의존성을 끊었는가?

[리뷰 작성 가이드]
- 위 4가지 기준 중 위반 사항이 있는 경우에만 구체적으로 지적하세요.
- 단순히 "고치세요"가 아니라, "이 코드는 가독성 측면에서 맥락이 너무 많습니다. 추상화하여 맥락을 줄이는 예시입니다:" 와 같이 구체적인 코드 대안(Markdown Block)을 제시하세요.
- 말투는 정중하되 핵심을 찌르는 동료 개발자 톤으로 작성하세요. (한국어)
- 단, 결합도를 낮추기 위해 의도적으로 중복 코드를 허용한 경우에는 지적하지 마십시오. 상황에 따라 트레이드오프(Trade-off)를 고려하여 판단하세요.
"""

def get_pr_diff(repo, pr_num):
    pr = repo.get_pull(pr_num)
    # 변경된 파일들의 패치(Diff) 정보를 가져옵니다.
    # 토큰 절약을 위해 너무 긴 파일은 앞부분만 자르거나 제외하는 로직을 추가할 수 있습니다.
    diffs = []
    for file in pr.get_files():
        if file.filename.endswith(('.js', '.jsx', '.ts', '.tsx', '.css', '.scss')): # 프론트엔드 관련 파일만
            patch = file.patch if file.patch else "No content"
            diffs.append(f"File: {file.filename}\nDiff:\n{patch}\n")
    return "\n".join(diffs)

def post_comment(repo, pr_num, comment_body):
    pr = repo.get_pull(pr_num)
    pr.create_issue_comment(comment_body)

def analyze_code(diff_content):
    # Gemini 1.5 Flash 모델 사용 (무료 티어, 빠름)
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=SYSTEM_INSTRUCTION
    )
    
    prompt = f"""
    아래는 GitHub Pull Request에서 변경된 코드(Diff)입니다.
    이 코드를 가이드라인에 맞춰 리뷰해주고, 개선된 코드를 마크다운 블록으로 제안해주세요.
    
    [Changes]
    {diff_content}
    """
    
    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    g = Github(repo_token)
    repo = g.get_repo(repo_name)
    
    print("Fetching PR Diff...")
    diff_content = get_pr_diff(repo, pr_number)
    
    if not diff_content:
        print("No changes detected in relevant files.")
    else:
        print("Requesting Review to Gemini...")
        review_result = analyze_code(diff_content)
        
        print("Posting Comment...")
        post_comment(repo, pr_number, review_result)
        print("Done!")
