import { BoltCreate } from "@/features/bolts/bolt-types";
import { CustomerCreate } from "@/features/customers/customer-types";
import { EarCreate } from "@/features/ears/ear-types";
import { HingeCreate } from "@/features/hinges/hinge-types";
import { JambHoleCreate } from "@/features/jamb-holes/jamb-hole-types";
import { KnobCreate } from "@/features/knobs/types/Knob";
import { LockCreate } from "@/features/locks/types/Lock";
import { ModelCreate } from "@/features/models/model-types";
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

    const hinges: HingeCreate[] = [
        { name: "нет" },
        { name: "Петли капелька" },
        { name: "Пели на подшипнике" },
        { name: "Петли на шарике" },
        { name: "Петли Барк" },
        { name: "см.прим." },
    ];

    for (const item of hinges) {
        await prisma.hinge.create({
            data: item,
        });
    }

    console.log(`Создано ${hinges.length} петлей`);

    const models: ModelCreate[] = [
        { code: "МП2", name: "металл-панель 2к" },
        { code: "ПП2", name: "панель-панель 2к" },
        { code: "МП3", name: "металл-панель 3к" },
        { code: "ПП3", name: "панель-панель 3к" },
        { code: "ДМП2", name: "двустворчатая металл-панель 2к" },
        { code: "ДПП2", name: "двустворчатая панель-панель 2к" },
        { code: "МПТ3", name: "металл-панель термо 3к" },
        { code: "ППТ3", name: "панель-панель термо 3к" },
    ];

    for (const item of models) {
        await prisma.model.create({
            data: item,
        });
    }

    console.log(`Создано ${models.length} моделей`);

    const customers: CustomerCreate[] = [
        { code: "D000", name: "разовый заказчик" },
        { code: "D100", name: "Склад" },
        { code: "D001", name: "Красноярск" },
        { code: "D002", name: "Иванов" },
        { code: "D003", name: "ГАМ" },
        { code: "D004", name: "РДК" },
       
    ];

    for (const item of customers) {
        await prisma.customer.create({
            data: item,
        });
    }

    console.log(`Создано ${customers.length} заказчиков`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
