import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import Stats from "./stats";
import { formDataToObject } from "@repo/model/lib/utils";
import { revalidatePath } from "next/cache";
import HasOrderSelected from "./has-order-selected";
import { createCollaboratorInvoice } from "@repo/model/repository/collaborator-invoice";
import { collaboratorCardBankRepository } from "@repo/model/repositories/collaborator-card-bank";
import { UserWithCollaboratorProfile } from "@repo/model/types/user";
import UserIcon from "../../user-icon";
import { UserBusinessType, TUserBusinessType } from "@repo/model/types/enums";

interface UserProfileProps {
  user: UserWithCollaboratorProfile;
  businessId: string;
}

export default async function UserProfile({
  user,
  businessId,
}: UserProfileProps) {
  const t = await getTranslations("UserDetail");
  const saveInvoice = async (props: any) => {
    "use server";
    const data = formDataToObject(props);
    await createCollaboratorInvoice({
      ...data,
      collaboratorId: user.id,
      businessId,
      confirmed: false,
    });
    return revalidatePath(`/${businessId}/users/${user.id}`);
  };
  const cards = await collaboratorCardBankRepository.getAll(
    businessId,
    user.id,
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(`title.${user._userType}`)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex sm:flex-row mb-4 flex-col sm:justify-between w-full">
          <div className="flex space-x-4">
            <img
              src={user.image as string}
              referrerPolicy="no-referrer"
              alt={user.name as string}
              className="rounded-full"
            />
            <div className="mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <UserIcon userType={user._userType as TUserBusinessType} />
                {user.name}
              </h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" />
                {user.phone}
              </div>
            </div>
          </div>
          <HasOrderSelected action={saveInvoice} cards={cards} />
        </div>
        {user._userType === UserBusinessType.COLLABORATOR && (
          <Stats user={user} />
        )}
      </CardContent>
    </Card>
  );
}
