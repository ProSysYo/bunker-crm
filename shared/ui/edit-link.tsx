import { Button } from "@heroui/react";
import { Edit } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

type Props = {
    href: Url
}

export const EditLink = ({href}: Props) => {
    return (
        <Link href={href}>
            <Button isIconOnly size="sm" variant="light" color="primary" aria-label="Редактировать">
                <Edit size={18} />
            </Button>
        </Link>
    );
};
