import { TLockCreate } from "@/features/locks/types/TLock";
import { TPadCreate } from "@/features/pads/types/TPad";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const locks: TLockCreate[] = [
        { name: "Г1211", type: "сувальда" },
        { name: "Г1212", type: "сувальда + цилиндр" },
        { name: "Г1213", type: "цилиндр" },
        { name: "Г1214", type: "сувальда + цилиндр" },
        { name: "Г1215", type: "цилиндр + сувальда" },
        { name: "Г1216", type: "цилиндр + сувальда" },
        { name: "Г1217", type: "цилиндр + сувальда" },
        { name: "Г1218", type: "цилиндр + сувальда" },
        { name: "Г1219", type: "цилиндр + сувальда" },
        { name: "Г1220", type: "цилиндр + сувальда" },
        { name: "Г1221", type: "цилиндр + сувальда" },
        { name: "Г1222", type: "цилиндр + сувальда" },
        { name: "Г1223", type: "цилиндр + сувальда" },
        { name: "Г1224", type: "цилиндр + сувальда" },
        { name: "Г1225", type: "цилиндр + сувальда" },
        { name: "Г1227", type: "цилиндр + сувальда" },
        { name: "Г1228", type: "цилиндр + сувальда" },
        { name: "Г1229", type: "цилиндр + сувальда" },
        { name: "Г1230", type: "цилиндр + сувальда" },
        { name: "Г1231", type: "цилиндр + сувальда" },
        { name: "Г1232", type: "цилиндр + сувальда" },
    ];

    for (const lock of locks) {
        await prisma.lock.create({
            data: lock,
        });
    }

    console.log(`Создано ${locks.length} замков`);

    const pads: TPadCreate[] = [
        { name: "Sec-21 Л", type: "suvaldny" },
        { name: "Sec-21 Х", type: "suvaldny" },
        { name: "Sec-21 Б", type: "suvaldny" },
        { name: "ЕБ-33", type: "suvaldny" },
        { name: "ЕЛ-33", type: "suvaldny" },
        { name: "ЕХ-33", type: "suvaldny" },
        { name: "Крит-21 Л", type: "suvaldny" },
    ];

    for (const item of pads) {
        await prisma.pad.create({
            data: item,
        });
    }

    console.log(`Создано ${pads.length} накладок`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
