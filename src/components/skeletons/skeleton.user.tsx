
import { Card,  CardHeader } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

const SkeletonUser = () => {
  return (
    <Card className='relative w-full container mt-10 h-[30vh]'>
      <CardHeader className='flex flex-row gap-x-2'>
        <div className='mt-[14px]'>
          <Avatar className='h-10 w-10 rounded-full'>
            <Skeleton className='h-full w-full rounded-full' />
          </Avatar>
        </div>
        <div className='flex flex-col flex-grow gap-y-2'>
          <Skeleton className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-2 w-16 mt-1' />
            </div>
          </Skeleton>
          <div className='gap-y-2 flex flex-col'>
            <Skeleton className='h-6 w-full' />
            <Skeleton className='h-3 w-3/4' />
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default SkeletonUser
