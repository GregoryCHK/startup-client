import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

import { MoreVertical, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BasicModal from "@/components/basic-modal";
import { useState } from "react";
import { CardType } from "@/types/cards";
import { Separator } from "@/components/ui/separator";
import DeleteComponent from "./delete-component";


// Add more types later

interface CardProps {
  type: CardType;
  title: string;
  count?: number;
  lastUpdated: string | Date;
  confirmationId: string;
  confirmationName: string;
}

export function Card({ type, title, count, lastUpdated, confirmationId, confirmationName }: CardProps) {
  // Map card types to their routes and images
  const routeMap: Record<CardType, string> = {
    "action-plan": "ActionPlan",
    "accommodation": "Accommodation",
  };
  const imageMap: Record<CardType, string> = {
    "action-plan": "/images/action_plan.jpg",
    "accommodation": "/images/accommodation.jpg",
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for Deleting an Action Plan
  

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-xl transition-shadow">
      <Link
        href={{
          pathname: `/confirmations/${confirmationId}/${type}`,
          query: { confirmationName },
        }} 
      >  
        <Image src={imageMap[type]} alt="Image" width={200} height={100} className="rounded-md mb-2" />
        <h3 className="text-lg font-semibold text-center">{title}</h3>
      </Link>
      <Separator orientation="horizontal" className="text-foreground my-1" />
      <div className="flex justify-between items-center my-2 py-2">
        <p className="text-gray-600 text-sm">{count} {type === 'accommodation' ? 'hotels' : 'activities'}</p>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="hover:text-foreground"
            >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1" data-prevent-click >
          <DropdownMenuItem
            onClick={() => setIsDeleteModalOpen((prev) => !prev)} 
            >
            <Trash2 />Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Modal */}
      <BasicModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen((prev) => !prev)} title={""}>
        <DeleteComponent confirmationId={confirmationId} type={type} onClose={() => setIsDeleteModalOpen((prev) => !prev)}/>
      </BasicModal>

      </div>

      <div className="text-sm text-gray-500">
          Last updated: {formatDate(lastUpdated)}
      </div>
    </div>
  );
}