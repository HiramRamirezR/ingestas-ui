const go = document.querySelector('#go');
let result = document.getElementById("result");


go.addEventListener('click', () => {


  let mainDirectory = document.querySelector('#main-directory').value;
  const rootName = document.querySelector('#root-name').value;
  const project = document.querySelector('#project').value;
  const mainTrackExcluded = document.querySelector('#main-track-excluded').checked;
  let mainEdl = document.querySelector('#main-edl').value.split('\\').at(-1);
  let additionalEdls = document.querySelector('#additional-edls').files;
  console.log(additionalEdls.value);
  let additionalEdlsArr = [];
  let movMp4 = document.querySelector('#mov-mp4').value;
  let email = document.querySelector('#email').value;
  let sendEmail = document.querySelector('#send-email').checked
  const updateEpisode = document.querySelector('#update-episode').checked;
  const publishSequence = document.querySelector('#publish-sequence').checked

mainDirectory = mainDirectory.replace(/\\/g, '/');

for (let i = 0; i < additionalEdls.length; i++) {
  additionalEdlsArr.push(`'{MAIN_DIRECTORY}/{ROOT_NAME}_${additionalEdls[i].name}'.format(**locals()),`);
}

let emails = email.split(',')
let emailsArr = []

for (let i = 0; i < emails.length; i ++) {
  emailsArr.push(emails[i].trim())
}

  const data = `  import sys
  import os

  MAIN_DIRECTORY = '${mainDirectory}'
  ROOT_NAME = '${rootName}'

  WORK_DIR = os.getenv('WORK_DIR', 'C:/mty-process-editorial/')
  sys.path.append(WORK_DIR)

  additional_edls = [
    ${additionalEdlsArr != 0 ? additionalEdlsArr.join('\n') : ''}
  ]

  sys.argv = [
      '{MAIN_DIRECTORY}/{ROOT_NAME}_${mainEdl}'.format(**locals()),
      '{MAIN_DIRECTORY}/{ROOT_NAME}.${movMp4}'.format(**locals()),
      '{MAIN_DIRECTORY}/{ROOT_NAME}.wav'.format(**locals()),
      'S:/pipeline/pythonmodules/mty-framework-ffmpeg-master/bin/win/ffmpeg.exe',
      '${project} - Episode', '${project} - Sequence', '${project} - Shot',
      'S:/pipeline/pythonmodules/mty-framework-metasync-master',
      '${mainDirectory}',
      ${mainTrackExcluded ? 'True' : 'False'},
      additional_edls,
      '${emailsArr}',
      ${sendEmail ? 'True' : 'False'},
      3,
      ${updateEpisode ? 'True' : 'False'},
      ${publishSequence ? 'True' : 'False'}
  ]

  execfile('%s/process_editorial.py' % WORK_DIR)`

console.log(data);
result.value = data;
result.select();
document.execCommand('copy');
alert('Script copied. Paste it in the Shotgrid Python Console.')
});
