import { Modal, Button } from "@heroui/react";
import { ReactNode } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    children: ReactNode;
    confirmText?: string;
    cancelText?: string;
    isConfirmDanger?: boolean;
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = "Подтвердите действие",
    children,
    confirmText = "Да",
    cancelText = "Нет",
    isConfirmDanger = true,
}: Props) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onOpenChange={onClose}>
            <Button className="hidden" onPress={() => {}} />
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Heading>{title}</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>{children}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="tertiary" onPress={onClose}>
                                {cancelText}
                            </Button>
                            <Button
                                variant={isConfirmDanger ? "danger-soft" : "primary"}
                                onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                {confirmText}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
