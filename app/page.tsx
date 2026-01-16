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

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            Сварка
          </p>
          <p className="mt-2 text-2xl font-semibold">1200</p>
          <p className="mt-1 text-xs text-muted-foreground">
            -12% к прошлой неделе
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            Панельный
          </p>
          <p className="mt-2 text-2xl font-semibold">500</p>
          <p className="mt-1 text-xs text-muted-foreground">
            +10% к прошлой неделе
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            Отделка
          </p>
          <p className="mt-2 text-2xl font-semibold">900</p>
          <p className="mt-1 text-xs text-muted-foreground">
            -12% к прошлой неделе
          </p>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            Ожидает отгрузку
          </p>
          <p className="mt-2 text-2xl font-semibold">2000</p>
          <p className="mt-1 text-xs text-muted-foreground">
            +50% к прошлой неделе
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            Конструктора
          </p>
          <p className="mt-2 text-2xl font-semibold">900</p>
          <p className="mt-1 text-xs text-muted-foreground">
            +90% к прошлой неделе
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            Менеджеры
          </p>
          <p className="mt-2 text-2xl font-semibold">900</p>
          <p className="mt-1 text-xs text-muted-foreground">
            -50% к прошлой неделе
          </p>
        </div>
      </section>
    </div>
  );
}
