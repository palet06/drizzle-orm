import { Button } from '@/components/ui/button'
import { assignedTaskListType, teamMemberWithIdSelectType } from '@/lib/dbactions'
import Image from 'next/image'
import React from 'react'

const TeamHeader = ({teamMember,tasklists}:{teamMember:teamMemberWithIdSelectType,tasklists:assignedTaskListType}) => {
  return (
    <div id="header" className="flex justify-between">
          <div className="flex flex-col items-center">
            <Image
              className="rounded-xl"
              src={teamMember?.profilePictureUrl || "/profile.jpg"}
              width={100}
              height={100}
              alt="profile"
            />
            <div className="flex items-center">
              <h3 className="text-xl">{teamMember?.name} {teamMember?.surname?.toUpperCase()}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <div className="flex flex-col items-center">
              <p>{tasklists?.length}</p>
              <p>Atanan Görev</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{tasklists?.filter((d)=>d.task.isDone==true).length}</p>
              <p>Tamamlanmamış Görev</p>
            </div>
            <div className="flex flex-col items-center">
              <p>%{((tasklists!.filter((d)=>d.task.isDone==true).length *100) / (tasklists!.length) ).toFixed(1)}</p>
              <p>Performans</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button>Görev Ata</Button>
          </div>
        </div>
  )
}

export default TeamHeader