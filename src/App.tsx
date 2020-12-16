import React from 'react';
import './App.css';

function Player() {
  return <span className="player" >佑樹</span>;
}

type CommandName = "title" | "outline" | "visible" | "face" | "focus" | "background" | "print" | "tag" | "goto" | "bgm" | "touch" | "choice" | "vo" | "wait" | "in_L" | "in_R" | "out_L" | "out_R" | "fadein" | "fadeout" | "in_float" | "out_float" | "jump" | "shake" | "pop" | "nod" | "se" | "black_out" | "black_in" | "white_out" | "white_in" | "transition" | "situation" | "color_fadein" | "flash" | "shake_text" | "text_size" | "shake_screen" | "double" | "scale" | "title_telop" | "window_visible" | "log" | "novoice" | "change" | "fadeout_all" | "movie" | "movie_stay" | "battle" | "still" | "bust" | "amb" | "reward" | "name_dialog" | "effect" | "effect_delete" | "eye_open" | "mouth_open" | "end" | "emotion" | "emotion_end" | "amb_stop" | "bgm_stop" | "bgm_resume" | "bgm_volume" | "amb_resume" | "amb_volume" | "se_pause" | "chara_full" | "sway" | "bg_color" | "pan" | "still_unit" | "slide" | "shake_once" | "transition_resume" | "shake_loop" | "shake_delete" | "unface" | "token" | "effect_env" | "bright_change" | "chara_shadow" | "ui_visible" | "fadein_all" | "change_window" | "bg_pan" | "still_move" | "still_normalize" | "vo_effect" | "trial_end" | "se_effect" | "updown" | "bg_zoom" | "split" | "camera_zoom" | "split_slide" | "bgm_transition" | "shake_anime" | "insert" | "place" | "bgm_overview" | "multi_talk" | "jingle_start" | "touch_to_start";

interface Command {
  "command"?: CommandName,
  "category"?: number,
  "args": string[],
  "number": number
}
type CommandList = Command[]

// TODO: We can also use another way
// That is, add a tmp var, add to it first, then submit
function Story(props: { commandList: CommandList }) {

  let face: string | undefined = undefined
  let voice: string | undefined = undefined
  let textSize: number | undefined = undefined

  const nodes = props.commandList.reduce((prev, curr, idx) => {
    const lastElem = prev[prev.length - 1];

    switch (curr.command) {
      case 'title':
        return prev.concat(<Title key={idx}>{curr.args[0]}</Title>)

      case 'outline':
        return prev.concat(<Outline key={idx}>{ReplacePlayer(curr.args[0], '{0}', idx.toString())}</Outline>)

      case 'situation':
        return prev.concat(<Situation key={idx}>{curr.args[0]}</Situation>)

      case 'print':
        const printItem = ReplacePlayer(curr.args[1], '{0}', idx.toString());

        if (lastElem?.type === Print && lastElem.props.name === curr.args[0]) {
          const newElem = lastElem.props.children.concat(printItem);

          voice = face = undefined
          prev[prev.length - 1] = React.cloneElement(lastElem, { children: newElem })
          return prev;
        }

        const print = <Print name={curr.args[0]} voice={voice} face={face} textSize={textSize} key={idx}>{printItem}</Print>;
        voice = face = textSize = undefined
        return prev.concat(print)

      case 'wait':
        const num = Number(curr.args[0]);
        const waitItem = <Wait second={num} key={idx} />;

        if (num) {
          if (lastElem?.type === Print) {
            const newElem = lastElem.props.children.concat(waitItem)
            prev[prev.length - 1] = React.cloneElement(lastElem, { children: newElem })
          }
        }

        return prev;

      case 'touch':
        return prev.concat(undefined);

      case 'choice':
        const choiceItem = [<ChoiceItem tag={Number(curr.args[1])} key={idx}>{curr.args[0]}</ChoiceItem>];
        if (lastElem?.type === ChoiceList) {
          const newElem = lastElem.props.children.concat(choiceItem)
          prev[prev.length - 1] = <ChoiceList key={lastElem.key}>{newElem}</ChoiceList>;
          return prev;
        }
        return prev.concat(<ChoiceList key={idx}>{choiceItem}</ChoiceList>)

      case 'tag':
        return prev.concat(<Tag key={idx} tag={Number(curr.args[0])} />)

      case 'background':
        return prev.concat(<Background key={idx} file={curr.args[0]} />)

      case 'goto':
        return prev.concat(<Goto tag={Number(curr.args[0])} key={idx} />)

      case 'movie':
        return prev.concat(<Movie file={curr.args[0]} key={idx} />)

      case 'movie_stay':
        return prev.concat(<MovieStay file={curr.args[0]} key={idx} />)

      case 'vo':
        voice = curr.args[0]
        return prev;

      case 'bgm':
        const bgmItem = <Bgm file={curr.args[0]} key={idx} />

        if (lastElem?.type === Print) {
          const newElem = lastElem.props.children.concat(bgmItem)
          prev[prev.length - 1] = React.cloneElement(lastElem, { children: newElem })
          return prev
        }

        return prev.concat(bgmItem)

      case 'face':
        face = curr.args[0]
        return prev

      case 'text_size':
        textSize = Number(curr.args[0])
        if (textSize === 23) {
          textSize = undefined
        }
        return prev

      default:
        return prev;
    }
  }, [] as Array<JSX.Element | undefined>)

  const node = <div>{nodes}</div>

  return node
}

class StoryViewer extends React.Component<{}, { commandList: CommandList }> {
  state = {
    commandList: [] as CommandList
  }

  // async componentDidMount() {
  //   const config: Partial<EmscriptenModule> = {
  //     locateFile: file => `https://sql.js.org/dist/${file}`
  //   }
  //   const data = await fetch('https://ptt.moe/Assets/assets/_elementsresources/resources/masterdata/master.bytes')
  //   const buffer = new Uint8Array(await data.arrayBuffer())
  //   const sqljs = await initSqlJs(config);
  //   const db = new sqljs.Database(buffer)
  // }

  onFileChange: React.FormEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files;
    if (file == null || file[0] == null) {
      return;
    }

    reader.readAsText(file[0], 'UTF-8');
    reader.onload = e => {
      e.target && typeof e.target.result == 'string' && this.setFiles(e.target.result);
    }
  }

  onTextSubmit: React.FormEventHandler<HTMLInputElement> = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return
    }

    e.preventDefault();
    fetch(`https://cdn.jsdelivr.net/gh/KiruyaMomochi/RediveData/storydata/json/${(e.target as HTMLTextAreaElement).value}.json`)
      .then(res => res.json())
      .then(json => {
        (e.target as HTMLTextAreaElement).className = ""
        this.setState({
          commandList: json
        })
      })
      .catch(() => {
        (e.target as HTMLTextAreaElement).className = "notfound"
      })
  }

  setFiles(res: string) {
    const json = JSON.parse(res);
    this.setState({
      commandList: json
    })
  }

  render() {
    return (
      <>
        <input type="file" onChange={this.onFileChange} />
        <input type="text" onKeyDown={this.onTextSubmit} autoComplete="on" />
        <Story commandList={this.state.commandList} />
      </>
    )
  }
}

function App() {
  return (
    <div className="App">
      <StoryViewer />
    </div>
  );
}

export default App;

interface ChildrenOnly {
  readonly children: React.ReactNode
}

interface PrintProp extends ChildrenOnly {
  readonly name: string
  readonly face?: string
  readonly voice?: string
  readonly textSize?: number
}

interface WaitProp {
  readonly second: number
}

interface TagProp {
  readonly tag: number
}

interface ChoiceProp extends ChildrenOnly {
  readonly tag: number;
}

interface BackgroundProp {
  readonly file: string;
}

interface MovieProp {
  readonly file: string;
}

interface BgmProp {
  readonly file: string;
}

interface FaceProp {
  readonly file: string;
}

function ReplacePlayer(str: string, playerTemplate = '{0}', keyprep = '') {
  return str.split(playerTemplate).reduce((prev, current, i) => {
    const ret = ReplaceLinebreak(current, '\n', keyprep + '.' + i);
    if (i === 0)
      return ret;
    return prev.concat(<Player key={keyprep + '.' + i} />, ret)
  }, [] as Array<JSX.Element | string>)
}

function ReplaceLinebreak(str: string, lineBreak = '\n', keyprep = '') {
  return str.split(lineBreak).reduce((prev, current, i) => {
    if (i === 0)
      return [current]
    return prev.concat(<br key={keyprep + '.' + i} />, current)
  }, [] as Array<JSX.Element | string>)
}

function Title(prop: ChildrenOnly) {
  return <h1>{prop.children}</h1>;
}

function Outline(prop: ChildrenOnly) {
  return <blockquote className="outline">{prop.children}</blockquote>
}

function Situation(prop: ChildrenOnly) {
  return <div className="situation">{prop.children}</div>
}

function Wait(prop: WaitProp) {
  return (
    <span className="wait">{prop.second}</span>
  )
}

function ChoiceList(prop: ChildrenOnly) {
  return <div className="choice-list">{prop.children}</div>
}

function ChoiceItem(prop: ChoiceProp) {
  return (
    <div><span className="choice-tag">{prop.tag}</span>{prop.children}</div>
  )
}

function Tag(prop: TagProp) {
  return <div className="tag">{prop.tag}</div>
}

function Goto(prop: TagProp) {
  return <div className="goto">{prop.tag}</div>
}

function Background(prop: BackgroundProp) {
  return <img alt={`background ${prop.file}`} className="bg" src={`https://ptt.moe/Assets/assets/_elementsresources/resources/bg/main_bundleroot/bg_${prop.file}/bg_${prop.file}.png`} />
}

function Movie(prop: MovieProp) {
  return <video className="movie" controls preload="metadata" >
    <source src={`https://ptt.moe/Movies/t/story_${prop.file}/story_${prop.file}.mp4`} type="video/mp4" />
    <track label="Chinese" kind="subtitles" srcLang="zh-Hant" src={`https://ptt.moe/Subtitles/storydata_movie_${prop.file}.vtt`} default />
  </video>
}

function MovieStay(prop: MovieProp) {
  return <video className="movie" controls preload="metadata" >
    <source src={`https://ptt.moe/Movies/t/story_${prop.file}/story_${prop.file}.mp4`} type="video/mp4" />
    <track label="Chinese" kind="subtitles" srcLang="zh-Hant" src={`https://ptt.moe/Subtitles/storydata_movie_${prop.file}.vtt`} default />
  </video>
}

function Bgm(prop: BgmProp) {
  if (prop.file.includes('stop')) {
    return null;
    // return <div className="bgm">Bgm stop.</div>
  }
  return <div className="bgm">
    <audio src={`https://ptt.moe/Musics/${prop.file}/${prop.file}_000.flac`} controls />
    {prop.file}
  </div>
}


class Face extends React.Component<FaceProp> {
  render() {
    if (this.props.file.length !== 6) {
      return null;
    }

    return <img className="face" alt={`Face: ${this.props.file}`} src={`https://ptt.moe/Assets/assets/_elementsresources/resources/storydata/backlogicon/icon_unit_${this.props.file}.png`} />
  }
}

class Print extends React.Component<PrintProp, { play: boolean }, {}>
{
  state = {
    play: false
  }

  audio?: HTMLAudioElement

  componentDidMount() {
    if (this.audio == null && this.props.voice != null) {
      const audioSource = `https://ptt.moe/Voices/t/${this.props.voice.slice(0, -4)}/${this.props.voice}.flac`
      this.audio = new Audio(audioSource)
      this.audio.addEventListener('ended', () => this.setState({ play: false }))
    }
  }

  componentDidUpdate(prevProps: PrintProp) {
    if (this.props.voice != null && this.props.voice !== prevProps.children) {
      const audioSource = `https://ptt.moe/Voices/t/${this.props.voice.slice(0, -4)}/${this.props.voice}.flac`
      this.audio?.removeEventListener('ended', () => this.setState({ play: false }))
      this.audio = new Audio(audioSource)
      this.audio.addEventListener('ended', () => this.setState({ play: false }))
    }
  }

  componentWillUnmount() {
    this.audio?.removeEventListener('ended', () => this.setState({ play: false }))
  }

  togglePlay = () => {
    if (this.audio != null) {
      this.setState({ play: !this.state.play }, () => {
        this.state.play ? this.audio?.play() : this.audio?.pause()
      })
    }
  }

  render() {
    return (
      <div className={`print ${this.state.play ? 'playing' : ''}`} onClick={this.togglePlay}>
        {this.props.face && <Face file={this.props.face} />}
        <div className="print-name">{this.props.name}</div>
        <div
          className="print-content"
          style={{ fontSize: this.props.textSize ? `${this.props.textSize / 23}em` : undefined }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
