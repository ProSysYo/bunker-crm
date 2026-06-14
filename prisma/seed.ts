import { TLockCreate } from "@/features/locks/types/TLock";
import { TPadCreate } from "@/features/pads/types/TPad";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const locks: TLockCreate[] = [
        { name: "Г1211", type: "cylinder" },
        { name: "Г1212", type: "cylinder" },
        { name: "Г1213", type: "cylinder" },
        { name: "Г1214", type: "cylinder" },
        { name: "Г1215", type: "cylinder" },
        { name: "Г1216", type: "cylinder" },
        { name: "Г1217", type: "cylinder" },
        { name: "Г1218", type: "cylinder" },
        { name: "Г1219", type: "cylinder" },
        { name: "Г1220", type: "cylinder" },
        { name: "Г1221", type: "cylinder" },
        { name: "Г1222", type: "cylinder" },
        { name: "Г1223", type: "cylinder" },
        { name: "Г1224", type: "cylinder" },
        { name: "Г1225", type: "cylinder" },
        { name: "Г1227", type: "cylinder" },
        { name: "Г1228", type: "cylinder" },
        { name: "Г1229", type: "cylinder" },
        { name: "Г1230", type: "cylinder" },
        { name: "Г1231", type: "cylinder" },
        { name: "Г1232", type: "cylinder" },
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
