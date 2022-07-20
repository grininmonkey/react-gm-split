export default function containerAttributes(
    state, container
) {
    let attributes = {}
    if (Array.isArray(state?.containerAttributes))
        state.containerAttributes.forEach(attribute => {
            if (attribute.container === container)
                attributes[attribute.name] = attribute.value
        })
    
    return attributes
}