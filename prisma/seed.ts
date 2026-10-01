import { BoltCreate } from "@/features/bolts/bolt-types";
import { EarCreate } from "@/features/ears/ear-types";
import { JambHoleCreate } from "@/features/jamb-holes/jamb-hole-types";
import { KnobCreate } from "@/features/knobs/types/Knob";
import { LockCreate } from "@/features/locks/types/Lock";
import { PackagingCreate } from "@/features/packagings/packaging-types";
import { PadCreate } from "@/features/pads/types/Pad";
import { PaintCreate } from "@/features/paints/paint-types";
import { PeepholeCreate } from "@/features/peepholes/peephole-types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const locks: LockCreate[] = [
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

    const pads: PadCreate[] = [
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

    const knobs: KnobCreate[] = [{ name: "Р 26 Л" }, { name: "Р 26 Х" }, { name: "Р 26 Б" }];

    for (const item of knobs) {
        await prisma.knob.create({
            data: item,
        });
    }

    console.log(`Создано ${knobs.length} замков`);

    const bolts: BoltCreate[] = [
        { name: "Apecs Б" },
        { name: "Apecs Л" },
        { name: "Apecs Х" },
        { name: "Rezident Б" },
        { name: "Rezident Л" },
        { name: "Rezident Х" },
    ];

    for (const item of bolts) {
        await prisma.bolt.create({
            data: item,
        });
    }

    console.log(`Создано ${bolts.length} засовов`);

    const peepholes: PeepholeCreate[] = [
        { name: "хром центр" },
        { name: "хром сбоку" },
        { name: "латунь центр" },
        { name: "латунь сбоку" },
        { name: "бронза центр" },
        { name: "ХК центр" },
    ];

    for (const item of peepholes) {
        await prisma.peephole.create({
            data: item,
        });
    }

    console.log(`Создано ${peepholes.length} глазков`);

    const paints: PaintCreate[] = [
        { name: "антик бронза" },
        { name: "антик медь" },
        { name: "антик серебро" },
        { name: "антик синий" },
        { name: "шагрень черная" },
        { name: "шагрень серая" },
    ];

    for (const item of paints) {
        await prisma.paint.create({
            data: item,
        });
    }

    console.log(`Создано ${paints.length} цветов покраски`);

    const ears: EarCreate[] = [
        { name: "нет" },
        { name: "80x40x6шт" },
        { name: "80x40x8шт" },
        { name: "100x40x6шт" },
        { name: "100x40x8шт" },
        { name: "нестандартный" },
    ];

    for (const item of ears) {
        await prisma.ear.create({
            data: item,
        });
    }

    console.log(`Создано ${ears.length} ушей`);

    const packagings: PackagingCreate[] = [
        { name: "упаковка  ХАВЕР" },
        { name: "упаковка  LUXOR" },
        { name: "упаковка БЕЗ ПЕНОПЛАСТА" },
        { name: "картон+стрейч пленка" },
        { name: "упаковка ДВЕРИ ГУД" },
        { name: "упаковка БУНКЕР" },
    ];

    for (const item of packagings) {
        await prisma.packaging.create({
            data: item,
        });
    }

    console.log(`Создано ${packagings.length} упаковок`);

    const jambHoles: JambHoleCreate[] = [
        { name: "нет" },
        { name: "6 шт Д10" },
        { name: "8 шт Д10" },
        { name: "см.прим." },
    ];

    for (const item of jambHoles) {
        await prisma.jambHole.create({
            data: item,
        });
    }

    console.log(`Создано ${jambHoles.length} отверстий в коробе`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
