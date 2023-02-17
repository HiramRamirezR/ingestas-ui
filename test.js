const go = document.querySelector('#go');
let result = document.getElementById("result");


go.addEventListener('click', () => {

  let mainDirectory = document.querySelector('#main-directory').value;
  mainDirectory = mainDirectory.includes('Projects') ? mainDirectory.replace('Projects', 'P:').substring(1) : mainDirectory
  // const rootName = document.querySelector('#root-name').value;
  const project = document.querySelector('#project').value;
  const mainTrackExcluded = document.querySelector('#main-track-excluded').checked;
  let mainEdl = document.querySelector('#main-edl').value.split('\\').at(-1);
  let additionalEdls = document.querySelector('#additional-edls').files;
  let additionalEdlsArr = [];
  let movMp4 = document.querySelector('#mov-mp4').value.split('\\').at(-1);
  let wav = document.querySelector('#wav').value.split('\\').at(-1);
  let email = document.querySelector('#email').value;
  let addWatermark = document.querySelector('#add-watermark').checked
  const updateEpisode = document.querySelector('#update-episode').checked;
  const publishSequence = true

  let defaultEmails = `${project.toLowerCase()}-production@mighty.mx,pipeline@mighty.mx,`

mainDirectory = mainDirectory.replace(/\\/g, '/');

for (let i = 0; i < additionalEdls.length; i++) {
  additionalEdlsArr.push(`'{MAIN_DIRECTORY}/_${additionalEdls[i].name}'.format(**locals()),`);
}

let emails = email.split(',')
let emailsArr = []

for (let i = 0; i < emails.length; i ++) {
  emailsArr.push(emails[i].trim())
}

const data = `import sys
import os

MAIN_DIRECTORY = '${mainDirectory}'

WORK_DIR = os.getenv('WORK_DIR', 'S:/pipeline/mty-process-editorial/')
sys.path.append(WORK_DIR)

additional_edls = [
${additionalEdlsArr != 0 ? additionalEdlsArr.join('\n') : ''}
]

sys.argv = [
    '{MAIN_DIRECTORY}/_${mainEdl}'.format(**locals()),
    '{MAIN_DIRECTORY}/_${movMp4}'.format(**locals()),
    '{MAIN_DIRECTORY}/_${wav}'.format(**locals()),
    'S:/pipeline/pythonmodules/mty-framework-ffmpeg-master/bin/win/ffmpeg.exe',
    '${project} - Episode', '${project} - Sequence', '${project} - Shot',
    'S:/pipeline/pythonmodules/mty-framework-metasync-master',
    MAIN_DIRECTORY,
    ${mainTrackExcluded ? 'True' : 'False'},
    additional_edls,
    '${defaultEmails + emailsArr}',
    ${updateEpisode ? 'True' : 'False'},
    3,
    ${addWatermark ? 'True' : 'False'},
    ${publishSequence ? 'True' : 'False'},
]

execfile('%s/process_editorial.py' % WORK_DIR)`

console.log(data);
result.value = data;
result.select();
document.execCommand('copy');
alert('Script copied. Paste it in the Shotgrid Python Console.')
});

// # Path to the Main EDL file
// # Path to the Movie file
// # Path to the Audio file
// # Path to the ffmpeg bin
// # Task template name for: episode, seq and shot
// # Path to metasync
// # Main directory
// # Main track excluded
// # Additional EDLs
// # Emails
// # Update episode
// # Number of retries
// # Add watermark
// # Publish sequence
