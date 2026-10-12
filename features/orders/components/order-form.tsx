"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    Boxes,
    Coins,
    DoorOpen,
    KeyRound,
    Layers,
    Paintbrush,
    Package,
    Ruler,
    Sparkles,
    StickyNote,
    Wrench,
    type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "cn";
import { Button } from "@/shared/components/shadcn/button";
import { Field, FieldDescription, FieldLabel } from "@/shared/components/shadcn/field";
import { Textarea } from "@/shared/components/shadcn/textarea";
import { InputField } from "@/shared/components/input-field";
import { ComboboxField } from "@/shared/components/combobox-field";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { mapOrderOptions } from "../order-helpers";
import { orderFormDefaults, orderFormSchema, type OrderFormValues } from "../order-schema";
import type { OrderFormOptions, SelectOption } from "../oreder-types";

type SectionProps = {
    title: string;
    icon?: LucideIcon;
    description?: string;
    children: React.ReactNode;
    className?: string;
};

const Section = ({ title, icon: Icon, description, children, className }: SectionProps) => (
    <section className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
        <div className="mb-4 flex items-start gap-3">
            {Icon && (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                </span>
            )}
            <div className="space-y-0.5">
                <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
        </div>

        <div className="flex flex-col gap-4">{children}</div>
    </section>
);

type FlagFieldProps = {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

const FlagField = ({ label, checked, onCheckedChange }: FlagFieldProps) => (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-input px-3 py-2 text-sm transition-colors hover:bg-muted/50 has-checked:border-primary/40 has-checked:bg-primary/5">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className="size-4 accent-primary"
        />
        <span className="font-medium">{label}</span>
    </label>
);

type ChoiceFieldProps = {
    label: string;
    options: string[];
    value: string;
    onValueChange: (value: string) => void;
    error?: string;
};

const ChoiceField = ({ label, options, value, onValueChange, error }: ChoiceFieldProps) => (
    <Field data-invalid={!!error}>
        <FieldLabel>{label}</FieldLabel>
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <Button
                    key={option}
                    type="button"
                    size="sm"
                    variant={option === value ? "default" : "outline"}
                    className="min-w-9"
                    onClick={() => onValueChange(option)}
                >
                    {option}
                </Button>
            ))}
        </div>
        {error && <FieldDescription>{error}</FieldDescription>}
    </Field>
);

const cylinders: SelectOption[] = [
    { value: "нет", label: "нет" },
    { value: "к/к", label: "к/к" },
    { value: "к/в", label: "к/в" },
];

interface OrderFormProps {
    options: OrderFormOptions;
    editId?: number;
    initialValues?: Partial<OrderFormValues> | null;
    onSuccess?: () => void;
}

export const OrderForm = ({ options, editId, initialValues, onSuccess }: OrderFormProps) => {
    const router = useRouter();
    const isEdit = !!editId;

    const items = React.useMemo(() => mapOrderOptions(options), [options]);

    const [values, setValues] = React.useState<OrderFormValues>({
        ...orderFormDefaults,
        ...initialValues,
    });
    const [errors, setErrors] = React.useState<Partial<Record<keyof OrderFormValues, string>>>({});

    const setField = <K extends keyof OrderFormValues>(field: K, value: OrderFormValues[K]) => {
        if (field === "model" && values.model !== "") {
            setValues((prev) => ({ ...prev, [field]: value, leafWidth: "" }));
            setErrors((prev) => ({ ...prev, [field]: undefined, leafWidth: undefined }));
            toast.warning("Изменилась модель полотна, зависимые поля были сброшены");

            return;
        }
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = () => {
        const result = orderFormSchema.safeParse(values);

        if (!result.success) {
            setErrors(parseZodErrors(result.error) as Partial<Record<keyof OrderFormValues, string>>);
            toast.error("Проверьте правильность заполнения формы");
            return;
        }

        setErrors({});

        toast.success(isEdit ? "Заказ обновлён" : "Заказ создан");
        onSuccess?.();
    };

    const selectField = (
        id: keyof OrderFormValues,
        label: string,
        fieldItems: SelectOption[],
        opts?: { placeholder?: string; required?: boolean; emptyText?: string },
    ) => (
        <ComboboxField
            id={id}
            label={label}
            placeholder={opts?.placeholder ?? "Выберите значение"}
            emptyText={opts?.emptyText ?? "Справочник не заполнен"}
            items={fieldItems}
            value={values[id] as string}
            onValueChange={(v) => setField(id, v as OrderFormValues[typeof id])}
            error={errors[id]}
            required={opts?.required}
        />
    );

    return (
        <div className="flex flex-col gap-6 pb-16">
            {/* Заказ */}
            <Section title="Заказ" icon={StickyNote} description="Основные данные по заказу">
                {selectField("customerCode", "Заказчик", items.customers, {
                    placeholder: "Выберите заказчика",
                    required: true,
                })}
                <InputField
                    id="orderDate"
                    label="Дата оформления"
                    type="date"
                    value={values.orderDate}
                    error={errors.orderDate}
                    onChange={(e) => setField("orderDate", e.target.value)}
                />
                <InputField
                    id="doorsCount"
                    label="Количество дверей"
                    type="number"
                    min={1}
                    placeholder="1"
                    value={values.doorsCount}
                    error={errors.doorsCount}
                    onChange={(e) => setField("doorsCount", e.target.value)}
                />
                <Field data-invalid={!!errors.note}>
                    <FieldLabel htmlFor="note">Примечание</FieldLabel>
                    <Textarea
                        id="note"
                        placeholder="Ограничение — 420 символов"
                        value={values.note}
                        aria-invalid={!!errors.note}
                        onChange={(e) => setField("note", e.target.value)}
                    />
                    {errors.note && <FieldDescription>{errors.note}</FieldDescription>}
                </Field>
            </Section>

            {/* Конструктив */}
            <Section title="Конструктив" icon={Ruler} description="Модель, габариты, тип открывания, петли, металл">
                {selectField("model", "Модель полотна", items.models, {
                    placeholder: "Выберите модель",
                    required: true,
                })}

                <ChoiceField
                    label="Толщина полотна, мм"
                    options={["60", "70", "80", "90", "100"]}
                    value={values.leafThickness}
                    onValueChange={(v) => setField("leafThickness", v)}
                    error={errors.leafThickness}
                />
                <InputField
                    id="height"
                    label="Высота двери, мм"
                    type="number"
                    placeholder="2000"
                    value={values.height}
                    error={errors.height}
                    onChange={(e) => setField("height", e.target.value)}
                />
                <InputField
                    id="width"
                    label="Ширина двери, мм"
                    type="number"
                    placeholder="900"
                    value={values.width}
                    error={errors.width}
                    onChange={(e) => setField("width", e.target.value)}
                />

                <InputField
                    id="leafWidth"
                    label="Ширина раб. створки, мм"
                    type="number"
                    placeholder=""
                    className="w-60"
                    value={values.leafWidth}
                    error={errors.leafWidth}
                    disabled={!values.model || values.model[0] !== "Д"}
                    onChange={(e) => setField("leafWidth", e.target.value)}
                />

                <ChoiceField
                    label="Толщина металла полотна, мм"
                    options={["1", "1.2", "1.4"]}
                    value={values.leafMetalThickness}
                    onValueChange={(v) => setField("leafMetalThickness", v)}
                    error={errors.leafMetalThickness}
                />

                <ChoiceField
                    label="Толщина металла коробки, мм"
                    options={["1.2", "1.4"]}
                    value={values.frameMetalThickness}
                    onValueChange={(v) => setField("frameMetalThickness", v)}
                    error={errors.frameMetalThickness}
                />

                <ChoiceField
                    label="Модель коробки"
                    options={["Открытая", "Закрытая", "Утеплённая"]}
                    value={values.frameModel}
                    onValueChange={(v) => setField("frameModel", v)}
                    error={errors.frameModel}
                />

                {selectField("jambHole", "Отверстия в коробке", items.jambHoles, {
                    placeholder: "Выберите отверстия",
                })}

                {selectField("ear", "Уши", items.ears, { placeholder: "Выберите уши" })}

                {selectField("hinge", "Петли", items.hinges, { placeholder: "Выберите петли" })}

                <ChoiceField
                    label="Сторонность петель"
                    options={["Левые", "Правые"]}
                    value={values.hingeSide}
                    onValueChange={(v) => setField("hingeSide", v)}
                    error={errors.hingeSide}
                />

                <FlagField
                    label="Три петли"
                    checked={values.hingeCount3}
                    onCheckedChange={(v) => setField("hingeCount3", v)}
                />
            </Section>

            {/* Замки и фурнитура */}
            <Section
                title="Замки и фурнитура"
                icon={KeyRound}
                description="Основной и дополнительный замок, ручки, накладки"
            >
                {selectField("mainLock", "Тип осн. замка", items.locks, {
                    placeholder: "Выберите замок",
                    required: true,
                })}

                {selectField("mainPad", "Накладки осн. замка", items.pads, { placeholder: "Выберите накладки" })}

                {selectField("knob", "Ручка", items.knobs, { placeholder: "Выберите ручку" })}

                {selectField("bolt", "Засов", items.bolts, { placeholder: "Выберите засов" })}

                {selectField("mainLockCylinder", "Цилиндр осн. замка", cylinders, {
                    placeholder: "Выберите цилиндр",
                    required: true,
                })}

                {selectField("extraLock", "Тип доп. замка", items.locks, {
                    placeholder: "Выберите замок",
                })}

                {selectField("extraPad", "Накладки доп. замка", items.pads, { placeholder: "Выберите накладки" })}

                {selectField("extraLockCylinder", "Цилиндр доп. замка", cylinders, {
                    placeholder: "Выберите цилиндр",
                    required: true,
                })}
            </Section>

            {/* Покраска */}
            <Section title="Покраска" icon={Paintbrush}>
                {selectField("paint", "Цвет покраски", items.paints, { placeholder: "Выберите цвет" })}
            </Section>

            <Section title="Металл и петли" icon={Wrench} description="Толщина металла, петли и доводчик">
                <FlagField
                    label="Усиление под доводчик"
                    checked={values.closerReinforcement}
                    onCheckedChange={(v) => setField("closerReinforcement", v)}
                />
                <FlagField label="Доводчик" checked={values.closer} onCheckedChange={(v) => setField("closer", v)} />
            </Section>

            {/* Отделка  снаружи*/}
            <Section title="Отделка снаружи" icon={Layers} description="Наружная панель, плёнка и патина">
                {selectField("outsideFinish", "Отделка снаружи", items.outsideFinishes, {
                    placeholder: "Выберите отделку",
                })}

                {selectField("outsideFoil", "Цвет плёнки (снаружи)", items.foils, {
                    placeholder: "Выберите плёнку",
                })}
            </Section>

            {/* Отделка внутри */}
            <Section title="Отделка внутри" icon={Layers} description="Внутренняя панель, плёнка и патина">
                {selectField("insideFinish", "Отделка внутри", items.insideFinishes, {
                    placeholder: "Выберите отделку",
                })}

                {selectField("insideFoil", "Цвет плёнки (внутри)", items.foils, {
                    placeholder: "Выберите плёнку",
                })}
            </Section>

            <Section title="Наличник" icon={Boxes}>
                {selectField("casingFoil", "Цвет плёнки наличника", items.foils, {
                    placeholder: "Выберите плёнку",
                })}
            </Section>

            <Section title="Дополнительные элементы" icon={Sparkles} description="Опции и оснащение двери">
                <FlagField
                    label="Уличная дверь"
                    checked={values.streetDoor}
                    onCheckedChange={(v) => setField("streetDoor", v)}
                />
                <FlagField
                    label="Эксцентрик"
                    checked={values.eccentric}
                    onCheckedChange={(v) => setField("eccentric", v)}
                />
                <FlagField
                    label="Задний лист"
                    checked={values.backSheet}
                    onCheckedChange={(v) => setField("backSheet", v)}
                />
                <FlagField
                    label="Термокабель"
                    checked={values.thermalCable}
                    onCheckedChange={(v) => setField("thermalCable", v)}
                />
                <FlagField
                    label="Усиление под доводчик"
                    checked={values.closerReinforcement}
                    onCheckedChange={(v) => setField("closerReinforcement", v)}
                />
                <FlagField label="Доводчик" checked={values.closer} onCheckedChange={(v) => setField("closer", v)} />

                <FlagField
                    label="Электромагнит"
                    checked={values.electromagnet}
                    onCheckedChange={(v) => setField("electromagnet", v)}
                />
                <FlagField
                    label="Подсветка"
                    checked={values.lighting}
                    onCheckedChange={(v) => setField("lighting", v)}
                />
                <FlagField
                    label="Шумоизоляция"
                    checked={values.soundproofing}
                    onCheckedChange={(v) => setField("soundproofing", v)}
                />
            </Section>

            <Section title="Упаковка и стоимость" icon={Package}>
                {selectField("packaging", "Тип упаковки", items.packagings, {
                    placeholder: "Выберите упаковку",
                })}
                <InputField
                    id="price"
                    label="Стоимость, ₽"
                    type="number"
                    placeholder="0"
                    value={values.price}
                    error={errors.price}
                    onChange={(e) => setField("price", e.target.value)}
                />
            </Section>

            <div className="sticky bottom-0 z-20 flex items-center justify-between gap-4 rounded-xl border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Coins className="size-4" />
                    <span>Стоимость: {values.price ? `${values.price} ₽` : "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Отмена
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        <DoorOpen className="size-4" />
                        {isEdit ? "Сохранить" : "Создать заказ"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
