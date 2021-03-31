import {
    ADD_BOX,
    DELETE_BOX,
    ADD_IMAGE,
    DELETE_IMAGE,
    RE_ARRANGE_BOX
} from '../Actions/actionType';

import { v4 as uuidv4 } from 'uuid';

const inititalState = {
    box: []
}

add_box = (state) => {
    const id = uuidv4()
    const new_box = {
        id: id,
        label: `Box ${id}`,
        images: []
    }

    return {
        ...state,
        box: [
            ...state.box,
            new_box
        ]
    }
}

delete_box = (state, box_id) => {
    const new_box = state.box.filter(bx => {
        if (bx.id === box_id) {
            return false
        } else {
            return true
        }
    })

    return {
        ...state,
        box: new_box
    }
}

add_image = (state, box_id, images) => {
    console.log("images: ", images)

    const new_images = images.map(img => {
        const id = uuidv4()
        return {
            ...img,
            id: id
        }
    })

    const new_box = state.box.map(bx => {
        if (bx.id === box_id) {
            const old_images = bx.images.filter(img => img.path !== 'add')
            return {
                ...bx,
                images: [ ...old_images, ...new_images, { path: 'add', id: 'add' } ]
            }
        } else {
            return bx
        }
    })

    return {
        ...state,
        box: new_box
    }
}

delete_image = (state, box_id, image_id) => {
    const new_box = state.box.map(bx => {
        if (bx.id === box_id) {
            const new_images = bx.images.filter(img => img.id !== image_id)
            return {
                ...bx,
                images: [ ...new_images ]
            }
        } else {
            return bx
        }
    })

    return {
        ...state,
        box: new_box
    }
}

re_arrange_box = (state, box) => {
    return {
        ...state,
        box: box
    }
}

const boxReducer = (state=inititalState, action) => {
    switch(action.type) {
        case ADD_BOX: return add_box(state);
        case DELETE_BOX: return delete_box(state, action.box_id);
        case ADD_IMAGE: return add_image(state, action.box_id, action.images);
        case DELETE_IMAGE: return delete_image(state, action.box_id, action.image_id);
        case RE_ARRANGE_BOX: return re_arrange_box(state, action.box);
        default: return state
    }
}

export default boxReducer;