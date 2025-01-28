import { ServerBeneficiaries } from "@/components/shared/beneficiaries/ServerBeneficiaries";

export default function BeneficiariesPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Beneficiaries</h1>
        <ServerBeneficiaries />
      </div>
    </main>
  );
}
