export function setRole(user, role, addrole) {
    if(addrole)
    {
        user.roles.add(role);
    }else{
        user.roles.remove(role);
    }
}