import lowPriority from '../assets/Img - Low Priority.svg';
import mediumPriority from '../assets/Img - Medium Priority.svg';
import highPriority from '../assets/Img - High Priority.svg';
import urgentPriority from '../assets/SVG - Urgent Priority grey.svg';
import noPriority from '../assets/No-priority.svg';

export const GROUPING_METHODS = {
    'USER' : 'user',
    'PRIORITY' : 'priority',
    'STATUS' : 'status'
}

export const SORTING_METHODS = {
    'PRIORITY' : 'priority',
    'TITLE' : 'title'
}

export const PRIORITY_VALUES = {
    0 : 'No priority',
    1 : 'Low',
    2 : 'Medium',
    3 : 'High',
    4 : 'Urgent'
}

export const STATUS_ORDER = [
    'Backlog',
    'In progress',
    'Todo'
]

export const PRIORITY_IMAGES = {
    0: noPriority,
    1: lowPriority,
    2: mediumPriority,
    3: highPriority,
    4: urgentPriority,
}

export const RANDOM_COLORS = [
    '#3333cc',
    '#333399',
    '#006666',
    '#009933',
    '#333300',
    '#990033',
]