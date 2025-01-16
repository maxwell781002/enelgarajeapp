import { customerRepository } from "../repositories/customer";
import { TCustomerForm } from "../validation/customer";

export const createCustomer = async (
  data: TCustomerForm,
  businessId: string,
) => {
  const customer = await customerRepository.findFirst({
    identification: data.identification,
    businessId,
  });
  const { phone, ...rest } = data;
  if (!customer) {
    return customerRepository.create({
      ...rest,
      businessId,
      phones: JSON.stringify([{ phone, lastUsed: new Date() }]),
    });
  }
  let phones = customer.phones || [];
  phones = JSON.parse(phones);
  const isPhone = phones.some((p: any) => p.phone === phone);
  if (isPhone) {
    phones = phones.map((p: any) => {
      if (p.phone === phone) {
        p.lastUsed = new Date();
      }
      return p;
    });
  } else {
    phones = [...phones, { phone, lastUsed: new Date() }];
  }
  return customerRepository.update(customer.id, {
    ...rest,
    businessId,
    phones: JSON.stringify(phones),
  });
};
