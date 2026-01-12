export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Обзор</h1>
        <p className="text-sm text-muted-foreground">
          Краткая статистика по заказам за сегодня.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            Всего заказов
          </p>
          <p className="mt-2 text-2xl font-semibold">128</p>
          <p className="mt-1 text-xs text-muted-foreground">
            +12% к прошлой неделе
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            Выполнено заказов
          </p>
          <p className="mt-2 text-2xl font-semibold">96</p>
          <p className="mt-1 text-xs text-muted-foreground">
            75% от общего количества
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            В процессе
          </p>
          <p className="mt-2 text-2xl font-semibold">32</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Ожидают выполнения
          </p>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-4 shadow-sm">
        <p className="text-xs font-medium text-muted-foreground">
          Динамика выполненных заказов (макет)
        </p>
        <div className="mt-4 flex h-32 items-end gap-2 rounded-lg bg-muted p-3">
          {[40, 60, 80, 50, 70, 90, 65].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-md bg-primary/80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
