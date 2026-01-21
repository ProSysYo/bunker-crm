import { Button } from "@heroui/react";
import { Trash } from "lucide-react";

type Props = {
    isLoading: boolean
    onDelete: () => void
}

export const DeleteBtn = ({isLoading, onDelete}: Props) => {
    return (
        <Button
            size="sm"
            color="danger"
            variant="light"
            isLoading={isLoading}
            onPress={onDelete}
            aria-label="Удалить"
            className="min-w-0 w-auto px-2"
        >
            <Trash size={18} />
        </Button>
    );
};
