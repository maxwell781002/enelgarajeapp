"use client";
import { useState } from "react";
import { Pencil1Icon, Cross2Icon, CheckIcon } from "@radix-ui/react-icons";
import { CompleteUser } from "@repo/model/zod/user";
import { useTranslations } from "next-intl";
import EntitySelect from "@repo/ui/components/entity-select";

interface MessengerProps {
  user?: CompleteUser | null;
  users: CompleteUser[];
  onUserChange: (userId: string) => void;
  className?: string;
  disabled?: boolean;
}

export function Messenger({
  user,
  users,
  onUserChange,
  className = "",
  disabled = false,
}: MessengerProps) {
  const t = useTranslations("OrderDetailBack");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(user);
  const handleSave = () => {
    if (!selectedUser) return;
    onUserChange(selectedUser.id as string);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setSelectedUser(user);
    setIsEditing(false);
  };
  const handleChange = (id: string) => {
    const user = users.find((u) => u.id === id);
    setSelectedUser(user);
  };

  if (!isEditing) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span>
          {selectedUser
            ? (selectedUser.name as string)
            : t("noMessengerAssigned")}
        </span>
        {!disabled && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Edit user"
          >
            <Pencil1Icon className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <EntitySelect
        placeholder={t("selectMessenger")}
        items={users.map((u) => ({
          name: u.name as string,
          id: u.id as string,
        }))}
        value={selectedUser?.id as string}
        onChange={(value) => handleChange(value as string)}
      />
      <div className="flex gap-1">
        <button
          onClick={handleSave}
          className="text-green-600 hover:text-green-800 focus:outline-none border border-green-600 hover:border-green-800 rounded p-1.5 transition-colors"
          aria-label="Save changes"
        >
          <CheckIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          className="text-red-600 hover:text-red-800 focus:outline-none border border-red-600 hover:border-red-800 rounded p-1.5 transition-colors"
          aria-label="Cancel"
        >
          <Cross2Icon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Messenger;
