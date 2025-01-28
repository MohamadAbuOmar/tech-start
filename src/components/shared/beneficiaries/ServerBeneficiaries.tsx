import { getBeneficiaries } from "@/app/actions/pages/beneficiaries";
import { cookies } from "next/headers";
import ClientBeneficiaries from "./ClientBeneficiaries";

export async function ServerBeneficiaries() {
  try {
    console.log('ServerBeneficiaries: Starting component render');
    
    const cookieStore = await cookies();
    const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar';
    console.log('ServerBeneficiaries: Language detected:', language);
    
    console.log('ServerBeneficiaries: Attempting to fetch beneficiaries');
    const beneficiariesResponse = await getBeneficiaries(language).catch(error => {
      console.error('ServerBeneficiaries: Database error:', error);
      throw error;
    });
    console.log('ServerBeneficiaries: Raw response:', JSON.stringify(beneficiariesResponse, null, 2));
    
    if (!beneficiariesResponse.success || !beneficiariesResponse.data) {
      console.error('ServerBeneficiaries: Failed to fetch data:', beneficiariesResponse.error);
      return (
        <div className="text-center py-8">
          <p className="text-red-500">Unable to load beneficiaries at this time.</p>
        </div>
      );
    }
    
    if (!Array.isArray(beneficiariesResponse.data)) {
      console.error('ServerBeneficiaries: Invalid response format - expected array');
      return (
        <div className="text-center py-8">
          <p className="text-red-500">Error: Invalid data format</p>
        </div>
      );
    }
    
    if (beneficiariesResponse.data.length === 0) {
      console.log('ServerBeneficiaries: No beneficiaries found');
      return (
        <div className="text-center py-8">
          <p>No beneficiaries available.</p>
        </div>
      );
    }
    
    console.log('ServerBeneficiaries: Successfully fetched', beneficiariesResponse.data.length, 'beneficiaries');

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ClientBeneficiaries beneficiaries={beneficiariesResponse.data} />
      </div>
    </section>
  );
} catch (error) {
  console.error('ServerBeneficiaries: Unhandled error:', error);
  return (
    <div className="text-center py-8">
      <p className="text-red-500">An unexpected error occurred. Please try again later.</p>
    </div>
  );
}
