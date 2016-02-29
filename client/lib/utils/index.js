Utils = {
  targetStatus(length, target) {
    const progressPercent = (!!target.length && target.length > 0) ? length * 100 / target.length : 0

    if (!target.length) {
      target.length = ''
    }

    let status = null
    if (!!target.length && target.length > 0 ) {
      if (progressPercent < 100) {
        status = 'start'
      }

      if ((target.type == 'about' && progressPercent >= 100 && progressPercent < 120) || (target.type == 'least' && progressPercent >= 100) || (target.type == 'most' && progressPercent == 100)) {
        status = 'done'
      }

      if ((target.type == 'about' && progressPercent >= 120) || (target.type == 'most' && progressPercent > 100)) {
        status = 'surplus'
      }
    }

    return {status, progressPercent}
  },
}
