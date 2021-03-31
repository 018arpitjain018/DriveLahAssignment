import {
    ADD_BOX,
    DELETE_BOX,
    ADD_IMAGE,
    DELETE_IMAGE,
    RE_ARRANGE_BOX
} from './actionType';

export const add_box = () => {
    return {
        type: ADD_BOX,
    }
}

export const delete_box = (box_id) => {
    return {
        type: DELETE_BOX,
        box_id: box_id
    }
}

export const add_image = (box_id, images) => {
    return {
        type: ADD_IMAGE,
        box_id: box_id,
        images: images
    }
}

export const delete_image = (box_id, image_id) => {
    return {
        type: DELETE_IMAGE,
        box_id: box_id,
        image_id: image_id
    }
}

export const re_arrange_box = (box) => {
    return {
        type: RE_ARRANGE_BOX,
        box: box
    }
}