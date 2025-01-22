import { NextResponse } from 'next/server';
import { ComplaintType, AttachmentData } from '@/types/complaint';
import db from '@/app/db/db';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.type || !['REGULAR', 'ANONYMOUS'].includes(data.type) ||
        !data.complaintDescription?.description ||
        !data.complaintDescription?.entity ||
        !data.complaintDetails?.facts ||
        !data.confirmed) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['REGULAR', 'ANONYMOUS'].includes(data.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid complaint type' },
        { status: 400 }
      );
    }

    const complaintNumber = `COMP-${Date.now()}`;
    const baseComplaintData = {
      type: data.type as ComplaintType,
      complaintNumber,
      description: data.complaintDescription.description,
      entityAgainst: data.complaintDescription.entity,
      filedInCourt: data.complaintDescription.filedInCourt,
      hasPreviousComplaint: data.previousComplaints.hasPreviousComplaint,
      previousComplaintEntity: data.previousComplaints.previousComplaintEntity,
      previousComplaintDate: data.previousComplaints.previousComplaintDate 
        ? new Date(data.previousComplaints.previousComplaintDate) 
        : null,
      facts: data.complaintDetails.facts,
      confirmed: data.confirmed,
      attachments: {
        createMany: {
          data: (data.attachments as AttachmentData[]).map(att => ({
            fileUrl: att.fileUrl,
            fileName: att.fileName,
            fileType: att.fileType,
            fileSize: att.fileSize
          }))
        }
      }
    };

    // Add regular complaint specific fields if type is REGULAR
    const complaintData = data.type === 'REGULAR' 
      ? {
          ...baseComplaintData,
          complainantType: data.complainantInfo?.complainantType,
          complainantName: data.complainantInfo?.name,
          complainantGender: data.complainantInfo?.gender,
          complainantEmail: data.complainantInfo?.email,
          complainantPhone: data.complainantInfo?.phone,
          firmName: data.complainantInfo?.firmName,
          firmEmail: data.complainantInfo?.firmEmail,
          firmPhone: data.complainantInfo?.firmPhone,
        }
      : baseComplaintData;

    const complaint = await db.complaint.create({
      data: complaintData
    });

    return NextResponse.json({
      success: true,
      complaintNumber: complaint.complaintNumber
    });
  } catch (error) {
    console.error('Complaint submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit complaint' },
      { status: 500 }
    );
  }
}
