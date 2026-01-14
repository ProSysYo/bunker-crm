import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
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
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} hideCloseButton>
            <ModalContent>
                {(onCloseInner) => (
                    <>
                        <ModalHeader className="text-lg font-semibold">{title}</ModalHeader>
                        <ModalBody>{children}</ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onCloseInner}>
                                {cancelText}
                            </Button>
                            <Button
                                color={isConfirmDanger ? "danger" : "primary"}
                                onPress={() => {
                                    onConfirm();
                                    onCloseInner();
                                }}
                            >
                                {confirmText}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
