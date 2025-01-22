import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Complaint } from "@/types/complaint"

export function ComplaintDetails({ complaint }: { complaint: Complaint }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Complaint Number" value={complaint.complaintNumber} />
            <DetailItem label="Status" value={complaint.status} />
            <DetailItem label="Submitted At" value={formatDate(complaint.submittedAt)} />
            <DetailItem label="Type" value={complaint.type} />
            
            {complaint.type === 'REGULAR' && (
              <>
                <DetailItem label="Complainant Name" value={complaint.complainantName} />
                <DetailItem label="Email" value={complaint.complainantEmail} />
                <DetailItem label="Phone" value={complaint.complainantPhone} />
                {complaint.complainantType === 'firm' && (
                  <>
                    <DetailItem label="Firm Name" value={complaint.firmName} />
                    <DetailItem label="Firm Email" value={complaint.firmEmail} />
                    <DetailItem label="Firm Phone" value={complaint.firmPhone} />
                  </>
                )}
              </>
            )}
            
            <DetailItem label="Description" value={complaint.description} fullWidth />
            <DetailItem label="Entity Against" value={complaint.entityAgainst} />
            <DetailItem label="Filed in Court" value={complaint.filedInCourt ? 'Yes' : 'No'} />
            
            {complaint.hasPreviousComplaint && (
              <>
                <DetailItem label="Previous Entity" value={complaint.previousComplaintEntity} />
                <DetailItem 
                  label="Previous Filing Date" 
                  value={complaint.previousComplaintDate ? formatDate(complaint.previousComplaintDate) : '-'} 
                />
              </>
            )}
            
            <DetailItem label="Facts and Grounds" value={complaint.facts} fullWidth />
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

function DetailItem({ 
  label, 
  value, 
  fullWidth = false 
}: { 
  label: string
  value: string | null | undefined
  fullWidth?: boolean 
}) {
  return (
    <div className={fullWidth ? "col-span-2" : undefined}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || '-'}</dd>
    </div>
  )
}
