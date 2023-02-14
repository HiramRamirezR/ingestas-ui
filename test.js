const go = document.querySelector('#go');
let result = document.getElementById("result");


go.addEventListener('click', () => {


  let mainDirectory = document.querySelector('#main-directory').value;
  const rootName = document.querySelector('#root-name').value;
  const project = document.querySelector('#project').value;
  const mainTrackExcluded = document.querySelector('#main-track-excluded').checked;
  let mainEdl = document.querySelector('#main-edl').value.split('\\').at(-1);
  let additionalEdls = document.querySelector('#additional-edls').files;
  console.log(additionalEdls);
  console.log(additionalEdls[0].name)
  let additionalEdlsArr = [];
// const emails = document.querySelector('#emails').value;
const updateEpisode = document.querySelector('#update-episode').checked;

mainDirectory = mainDirectory.replace(/\\/g, '/');

for (let i = 0; i < additionalEdls.length; i++) {
  additionalEdlsArr.push(`'{MAIN_DIRECTORY}/{ROOT_NAME}_${additionalEdls[i].name}'.format(**locals()),`);
}

  const data = `  import sys
  import os

  MAIN_DIRECTORY = '${mainDirectory}'
  ROOT_NAME = '${rootName}'

  WORK_DIR = os.getenv('WORK_DIR', 'C:/mty-process-editorial/')
  sys.path.append(WORK_DIR)

  ADDITIONAL_EDLS = [
    ${additionalEdlsArr != 0 ? additionalEdlsArr.join('\n') : ''}
  ]

  sys.argv = [
      '{MAIN_DIRECTORY}/{ROOT_NAME}_${mainEdl}'.format(**locals()),
      '{MAIN_DIRECTORY}/{ROOT_NAME}.mp4'.format(**locals()),
      '{MAIN_DIRECTORY}/{ROOT_NAME}.wav'.format(**locals()),
      'S:/pipeline/pythonmodules/mty-framework-ffmpeg-master/bin/win/ffmpeg.exe',
      '${project} - Episode', '${project} - Sequence', '${project} - Shot',
      'S:/pipeline/pythonmodules/mty-framework-metasync-master',
      '${mainDirectory}',
      ${mainTrackExcluded},
      ADDITIONAL_EDLS,
      '',
      ${updateEpisode},
      3
  ]

  execfile('%s/process_editorial.py' % WORK_DIR)`

console.log(data);
result.value = data;
result.select();
document.execCommand('copy');
// alert('Script copied to clipboard! Just go and paste it in the Shotgrid Python Console.')
// console.log(fs);
});
