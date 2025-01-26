import { LocalizedPartner } from "@/app/actions/pages/partners";

export const validatePartner = (partner: LocalizedPartner): boolean => {
  return Boolean(
    partner.id &&
    partner.name &&
    partner.imageUrl &&
    partner.type &&
    typeof partner.order === 'number'
  );
};
