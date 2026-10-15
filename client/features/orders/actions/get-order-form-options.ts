import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import type { OrderFormOptions } from "../oreder-types";

export async function getOrderFormOptions(): Promise<OrderFormOptions> {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }

    const [
        customers,
        models,
        locks,
        pads,
        knobs,
        bolts,
        peepholes,
        paints,
        ears,
        packagings,
        jambHoles,
        hinges,
        outsideFinishes,
        insideFinishes,
        foils,
    ] = await Promise.all([
        prisma.customer.findMany({ orderBy: { name: "asc" } }),
        prisma.model.findMany({ orderBy: { name: "asc" } }),
        prisma.lock.findMany({ orderBy: { name: "asc" } }),
        prisma.pad.findMany({ orderBy: { name: "asc" } }),
        prisma.knob.findMany({ orderBy: { name: "asc" } }),
        prisma.bolt.findMany({ orderBy: { name: "asc" } }),
        prisma.peephole.findMany({ orderBy: { name: "asc" } }),
        prisma.paint.findMany({ orderBy: { name: "asc" } }),
        prisma.ear.findMany({ orderBy: { name: "asc" } }),
        prisma.packaging.findMany({ orderBy: { name: "asc" } }),
        prisma.jambHole.findMany({ orderBy: { name: "asc" } }),
        prisma.hinge.findMany({ orderBy: { name: "asc" } }),
        prisma.outsideFinish.findMany({ orderBy: { name: "asc" } }),
        prisma.insideFinish.findMany({ orderBy: { name: "asc" } }),
        prisma.foil.findMany({ orderBy: { name: "asc" } }),
    ]);

    return {
        customers,
        models,
        locks,
        pads,
        knobs,
        bolts,
        peepholes,
        paints,
        ears,
        packagings,
        jambHoles,
        hinges,
        outsideFinishes,
        insideFinishes,
        foils,
    };
}
