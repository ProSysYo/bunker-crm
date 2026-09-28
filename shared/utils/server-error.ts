import { Prisma } from "@prisma/client";

export function handleServerError(error: unknown): string {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2025":
                return "Запись не найдена или уже была удалена";
            case "P2002":
                return "Такая запись уже существует (нарушение уникальности)";
            case "P2003":
                return "Невозможно удалить: запись связана с другими данными";
            default:
                return "Ошибка базы данных";
        }
    }

    if (error instanceof Error) {
        return error.message.replace(/^Error:\s*/, "");
    }

    return "Произошла неизвестная ошибка на сервере";
}
