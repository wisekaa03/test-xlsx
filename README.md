# test-xlsx

Да, нужно подправить в xlsx:
/** Chase down the rest of the DIFAT chain to build a comprehensive list
    DIFAT chains by storing the next sector number as the last 32 bits */
function sleuth_fat(idx, cnt, sectors, ssz, fat_addrs) {
        var q = ENDOFCHAIN;
        if(idx === ENDOFCHAIN) {
                // if(cnt !== 0) throw new Error("DIFAT chain shorter than expected");
                if(cnt !== 0) console.log("DIFAT chain shorter than expected");
        } else if(idx !== -1 /*FREESECT*/) {
                var sector = sectors[idx], m = (ssz>>>2)-1;
                if(!sector) return;
                for(var i = 0; i < m; ++i) {
                        if((q = __readInt32LE(sector,i*4)) === ENDOFCHAIN) break;
                        fat_addrs.push(q);
                }
                sleuth_fat(__readInt32LE(sector,ssz-4),cnt - 1, sectors, ssz, fat_addrs);
        }
}
