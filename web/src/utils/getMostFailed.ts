interface Tag {
  key: string;
  name: string;
}

interface LogEntry {
  id: number;
  title: string;
  level: number;
  tags: Tag[];
}

export const getTagStats = (logs: LogEntry[]) => {
  const tagMap = logs.reduce(
    (
      acc: {
        [key: string]: { name: string; count: number };
      },
      log
    ) => {
      log.tags.forEach((tag) => {
        if (!acc[tag.key]) {
          acc[tag.key] = { name: tag.name, count: 0 };
        }
        acc[tag.key].count += 1;
      });
      return acc;
    },
    {}
  );
  const result = Object.values(tagMap).sort((a, b) => b.count - a.count);
  return result
};
