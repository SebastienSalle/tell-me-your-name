export default function capitalize(name){

    return name.split(' ').join('').toLowerCase().split('-').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join('-')

}
