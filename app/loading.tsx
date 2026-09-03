export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}