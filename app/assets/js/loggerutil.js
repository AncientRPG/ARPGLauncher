const fs = require('fs');
const path = require('path')

// Forked processes do not have access to electron, so we have this workaround.
const launcherDir = process.env.CONFIG_DIRECT_PATH || require('electron').remote.app.getPath('userData')
fs.writeFile(path.join(launcherDir, 'client.log'), '', function(){console.log('Cleared Client Logs!')})

class LoggerUtil {

    constructor(prefix, style){
        this.prefix = prefix
        this.style = style
    }

    log(){
        console.log.apply(null, [this.prefix, this.style, ...arguments])
        fs.appendFileSync(path.join(launcherDir, 'client.log'), this.prefix.substring(2)+" "+[...arguments]+"\r\n");
    }

    info(){
        console.info.apply(null, [this.prefix, this.style, ...arguments])
        fs.appendFileSync(path.join(launcherDir, 'client.log'), this.prefix.substring(2)+" "+[...arguments]+"\r\n");
    }

    warn(){
        console.warn.apply(null, [this.prefix, this.style, ...arguments])
        fs.appendFileSync(path.join(launcherDir, 'client.log'), this.prefix.substring(2)+" "+[...arguments]+"\r\n");
    }

    debug(){
        console.debug.apply(null, [this.prefix, this.style, ...arguments])
        fs.appendFileSync(path.join(launcherDir, 'client.log'), this.prefix.substring(2)+" "+[...arguments]+"\r\n");
    }

    error(){
        console.error.apply(null, [this.prefix, this.style, ...arguments])
        fs.appendFileSync(path.join(launcherDir, 'client.log'), this.prefix.substring(2)+" "+[...arguments]+"\r\n");
    }

}

module.exports = function (prefix, style){
    return new LoggerUtil(prefix, style)
}
