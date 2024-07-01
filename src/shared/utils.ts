export const formatString = (str: string) =>
  str.replace(/_/g, " ").replace(/\b\w/g, (substr) => substr.toUpperCase());
