import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);


export const getTimeAgo = (date: string): string => {
    return dayjs(date).fromNow();
}

