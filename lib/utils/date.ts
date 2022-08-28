import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatFromNow = (date: dayjs.ConfigType) => dayjs(date).fromNow();
