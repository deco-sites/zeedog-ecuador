import { useCallback } from "preact/hooks";

export default function useClipboard() {
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      return err;
    }
  }, []);
  return copyToClipboard;
}
