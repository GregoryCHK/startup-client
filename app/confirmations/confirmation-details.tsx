import React from 'react'
import { Confirmation, formatDate } from '@/app/confirmations/columns';
import { Input } from '@/components/ui/input';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ConfirmationProps{
    confirmation: Confirmation;
};

function ConfirmationDetails({confirmation}: ConfirmationProps) {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-xl ">
      {/* Left Side */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <Input value={confirmation.name} readOnly className='text-foreground w-[50%]' />
        </div>
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <Input value={confirmation.email} readOnly className="text-blue-600 underline cursor-pointer w-[50%]" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Contact</label>
          <Input value={confirmation.contact} readOnly className='text-foreground w-[50%]'/>
        </div>
        <div>
          <label className="text-sm text-gray-600">No. of People</label>
          <Input value={confirmation.pax} readOnly className='text-foreground w-[50%]' />
        </div>
        <div>
          <label className="text-sm text-gray-600">Channel</label>
          <Input value={confirmation.channel} readOnly className='text-foreground w-[50%]' />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600">Destinations</label>
          <Textarea value={confirmation.destinations} readOnly rows={4} className='text-foreground' />
        </div>
        <div className=''>
          <label className="text-sm text-gray-600">Notes</label>
          <Textarea value={confirmation.notes} readOnly rows={4} className='text-foreground'/>
        </div> 
        <div>
            <label className="text-sm text-gray-600">Amount</label>
            <Input value={`$${confirmation.depositAmount}`} readOnly className='text-foreground'/>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="col-span-2 flex justify-between items-center">
        <div className="flex gap-4">
          <div>
            <label className="text-sm text-gray-600">Start Date</label>
            <Button variant="outline" className="w-full flex justify-between text-foreground">
              {formatDate(confirmation.startDate)}
              <CalendarIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div>
            <label className="text-sm text-gray-600">End Date</label>
            <Button variant="outline" className="w-full flex justify-between text-foreground" >
              {formatDate(confirmation.endDate)}
              <CalendarIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ConfirmationDetails;