export interface AnonymousComplaint {
    id: string
    date: Date
    willProvideContact: boolean
    description: string
    entityAgainst: string
    filedInCourt: boolean
    previousComplaint: boolean
    previousEntityAgainst?: string
    previousFilingDate?: Date
    receivedResponse?: boolean
    responseDate?: Date
    factsAndGrounds: string
    confirmed: boolean
    createdAt: Date
    updatedAt: Date
  }
  
  export type ComplaintType = 'REGULAR' | 'ANONYMOUS';
  export type ComplaintStatus = 'PENDING' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';
  
  export interface ComplaintAttachment {
    id: string;
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    uploadedAt: Date;
  }
  
  export interface ComplaintNote {
    id: string;
    authorName: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    complaintId: string;
  }
  
  export interface Complaint {
    id: string;
    complaintNumber: string;
    type: ComplaintType;
    status: ComplaintStatus;
    submittedAt: Date;
    updatedAt: Date;
    complainantType?: string;
    complainantName?: string;
    complainantGender?: string;
    complainantEmail?: string;
    complainantPhone?: string;
    firmName?: string;
    firmEmail?: string;
    firmPhone?: string;
    description: string;
    entityAgainst: string;
    filedInCourt: boolean;
    hasPreviousComplaint: boolean;
    previousComplaintEntity?: string;
    previousComplaintDate?: Date;
    facts: string;
    confirmed: boolean;
    attachments: ComplaintAttachment[];
    notes: ComplaintNote[];
  }

export interface ComplainantData {
  complainantType: 'individual' | 'firm';
  name?: string;
  gender?: string;
  phone?: string;
  email?: string;
  firmName?: string;
  firmPhone?: string;
  firmEmail?: string;
}

export interface ComplaintDescriptionData {
  description: string;
  entity: string;
  filedInCourt: boolean;
}

export interface PreviousComplaintData {
  hasPreviousComplaint: boolean;
  previousComplaintEntity?: string;
  previousComplaintDate?: string;
  receivedResponse?: boolean;
  responseDate?: string;
}

export interface ComplaintDetailsData {
  facts: string;
}

export interface AttachmentData {
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface ComplaintFormData {
  type: ComplaintType;
  complainantInfo?: ComplainantData;
  complaintDescription: ComplaintDescriptionData;
  previousComplaints: PreviousComplaintData;
  complaintDetails: ComplaintDetailsData;
  attachments: AttachmentData[];
  confirmed: boolean;
}

// Add initial state constant
export const initialFormData: ComplaintFormData = {
  type: 'REGULAR',
  complainantInfo: undefined,
  complaintDescription: {
    description: '',
    entity: '',
    filedInCourt: false
  },
  previousComplaints: {
    hasPreviousComplaint: false,
    previousComplaintEntity: '',
    previousComplaintDate: '',
    receivedResponse: false,
    responseDate: ''
  },
  complaintDetails: {
    facts: ''
  },
  attachments: [],
  confirmed: false
};

