import { customerRepository } from "../repositories/customer";
import { TCustomerForm } from "../validation/customer";

export const createCustomer = async (data: TCustomerForm) => {
  const customer = await customerRepository.findFirst({
    identification: data.identification,
    businessId: data.businessId,
  });
  const { phone, ...rest } = data;
  if (!customer) {
    return customerRepository.create({
      ...rest,
      phones: JSON.stringify([{ phone, lastUsed: new Date() }]),
    });
  }
  let phones = customer.phones || [];
  phones = JSON.parse(phones);
  const isPhone = phones.some((p) => p.phone === phone);
  if (isPhone) {
    phones = phones.map((p) => {
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
    phones: JSON.stringify(phones),
  });
};
