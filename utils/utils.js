module.exports.setRole = function(user, role, addrole) {
    if(addrole)
    {
        user.roles.add(role);
    }else{
        user.roles.remove(role);
    }
}