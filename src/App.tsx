/* eslint-disable max-classes-per-file */

import React from 'react';
import { Route, RouteProps, useLocation } from 'wouter';
import './App.css';

import { spine } from './spine';

interface ChildrenOnly {
  readonly children: React.ReactNode
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


function Player() {
  return <span className="player">佑樹</span>;
}

function ReplacePlayer(str: string) {
  const split: (string | JSX.Element)[] = str.split(/(\{0})/);
  for (let i = 1; i < split.length; i += 2) {
    split[i] = <Player key={'player-' + i.toString()} />;
  }
  return split;
}

function Title(prop: ChildrenOnly) {
  return <h1>{prop.children}</h1>;
}

function Voice(prop: { file: string }) {
  return <div className="voice">Voice {prop.file}</div>;
}

function Outline(prop: ChildrenOnly) {
  return <blockquote className="outline">{prop.children}</blockquote>;
}

function Situation(prop: ChildrenOnly) {
  return <div className="situation">{prop.children}</div>;
}

function Wait(prop: WaitProp) {
  return (
    <span className="wait">{prop.second}</span>
  );
}

function ChoiceList(prop: ChildrenOnly) {
  return <div className="choice-list">{prop.children}</div>;
}

function ChoiceItem(prop: ChoiceProp) {
  return (
    <div><span className="choice-tag">{prop.tag}</span>{prop.children}</div>
  );
}

function Tag(prop: TagProp) {
  return <div className="tag">{prop.tag}</div>;
}

function Goto(prop: TagProp) {
  return <div className="goto">{prop.tag}</div>;
}

function Background(prop: BackgroundProp) {
  return <img alt={`background ${prop.file}`} className="bg"
    src={`https://ptt.moe/Assets/assets/_elementsresources/resources/bg/main_bundleroot/bg_${prop.file}/bg_${prop.file}.png`} />;
}

function Movie(prop: MovieProp) {
  return <video className="movie" controls preload="metadata">
    <source src={`https://ptt.moe/Movies/t/story_${prop.file}/story_${prop.file}.mp4`} type="video/mp4" />
    <track label="Chinese" kind="subtitles" srcLang="zh-Hant"
      src={`https://cdn.jsdelivr.net/gh/KiruyaMomochi/RediveData/subtitle/movie_${prop.file}.vtt`} default />
  </video>;
}

function MovieStay(prop: MovieProp) {
  return <video className="movie" controls preload="metadata">
    <source src={`https://ptt.moe/Movies/t/story_${prop.file}/story_${prop.file}.mp4`} type="video/mp4" />
    <track label="Chinese" kind="subtitles" srcLang="zh-Hant"
      src={`https://cdn.jsdelivr.net/gh/KiruyaMomochi/RediveData/subtitle/movie_${prop.file}.vtt`} default />
  </video>;
}

function Bgm(prop: BgmProp) {
  if (prop.file.includes('stop')) {
    return null;
    // return <div className="bgm">Bgm stop.</div>
  }
  return <div className="bgm">
    <audio src={`https://ptt.moe/Bgm/${prop.file}/${prop.file}_000.m4a`} controls />
    {prop.file}
  </div>;
}

class Face extends React.Component<FaceProp> {
  render() {
    if (this.props.file.length !== 6) {
      return null;
    }

    return <img className="face" alt={`Face: ${this.props.file}`}
      src={`https://ptt.moe/Assets/assets/_elementsresources/resources/storydata/backlogicon/icon_unit_${this.props.file}.png`} />;
  }
}

enum CommandName {
  title = 'title', outline = 'outline', visible = 'visible', face = 'face', focus = 'focus', background = 'background', print = 'print', tag = 'tag', goto = 'goto', bgm = 'bgm', touch = 'touch', choice = 'choice', vo = 'vo', wait = 'wait', inL = 'in_L', inR = 'in_R', outL = 'out_L', outR = 'out_R', fadein = 'fadein', fadeout = 'fadeout', inFloat = 'in_float', outFloat = 'out_float', jump = 'jump', shake = 'shake', pop = 'pop', nod = 'nod', se = 'se', blackOut = 'black_out', blackIn = 'black_in', whiteOut = 'white_out', whiteIn = 'white_in', transition = 'transition', situation = 'situation', colorFadein = 'color_fadein', flash = 'flash', shakeText = 'shake_text', textSize = 'text_size', shakeScreen = 'shake_screen', double = 'double', scale = 'scale', titleTelop = 'title_telop', windowVisible = 'window_visible', log = 'log', novoice = 'novoice', change = 'change', fadeoutAll = 'fadeout_all', movie = 'movie', movieStay = 'movie_stay', battle = 'battle', still = 'still', bust = 'bust', amb = 'amb', reward = 'reward', nameDialog = 'name_dialog', effect = 'effect', effectDelete = 'effect_delete', eyeOpen = 'eye_open', mouthOpen = 'mouth_open', end = 'end', emotion = 'emotion', emotionEnd = 'emotion_end', ambStop = 'amb_stop', bgmStop = 'bgm_stop', bgmResume = 'bgm_resume', bgmVolume = 'bgm_volume', ambResume = 'amb_resume', ambVolume = 'amb_volume', sePause = 'se_pause', charaFull = 'chara_full', sway = 'sway', bgColor = 'bg_color', pan = 'pan', stillUnit = 'still_unit', slide = 'slide', shakeOnce = 'shake_once', transitionResume = 'transition_resume', shakeLoop = 'shake_loop', shakeDelete = 'shake_delete', unface = 'unface', token = 'token', effectEnv = 'effect_env', brightChange = 'bright_change', charaShadow = 'chara_shadow', uiVisible = 'ui_visible', fadeinAll = 'fadein_all', changeWindow = 'change_window', bgPan = 'bg_pan', stillMove = 'still_move', stillNormalize = 'still_normalize', voEffect = 'vo_effect', trialEnd = 'trial_end', seEffect = 'se_effect', updown = 'updown', bgZoom = 'bg_zoom', split = 'split', cameraZoom = 'camera_zoom', splitSlide = 'split_slide', bgmTransition = 'bgm_transition', shakeAnime = 'shake_anime', insert = 'insert', place = 'place', bgmOverview = 'bgm_overview', multiTalk = 'multi_talk', jingleStart = 'jingle_start', touchToStart = 'touch_to_start', eventAdvMoveHorizontal = 'event_adv_move_horizontal', bgPanX = 'background_pan_x', backgroundBlur = 'background_blur', seasonalReward = 'seasonal_reward', miniGame = 'mini_game', dialogAnimation = 'dialog_animation'
}

interface Command {
  'command'?: CommandName,
  'category'?: number,
  'args': string[],
  'number': number
}

type CommandList = Command[]

// function StoryRedive (props: {commandList: CommandList}) {
//   let window: string | undefined = undefined

//   props.commandList.
// }

enum FaceId {
  Invalid,
  Normal,
  Joy,
  Anger,
  Sad,
  Shy,
  Surprised,
  SpecialA,
  SpecialB,
  SpecialC,
  SpecialD,
  SpecialE,
  NoFace
}

interface CharaFullProp {
  unitId: string,
  faceId: keyof FaceId,
  characterPos: string
}

class CharaFull extends React.Component<CharaFullProp> {
  render() {
    return <div
      className="charaFull">{this.props.unitId} {this.props.characterPos} {this.props.faceId.toString()}</div>;
  }
}

class WindowContext implements WindowProp {
  name?: string;
  face?: string;
  children: React.ReactNode[] = [];
  textSize?: number;

  appendPrint(content: React.ReactNode, name?: string) {
    this.name = name;
    this.children.push(content);
  }

  appendWait(second: number) {
    this.children.push(<Wait second={second} />);
  }

  appendVoice(file: string) {
    this.children.push(<Voice file={file} />);
  }
}

interface WindowProp {
  name?: string,
  face?: string,
  children: React.ReactNode[],
  textSize?: number
}

function Window(props: WindowProp) {
  return <div className="window">
    {props.face && <Face file={props.face} />}
    {props.name && <div className="print-name">{props.name}</div>}
    <div className="print" style={{ fontSize: props.textSize ? `${props.textSize / 23}em` : undefined }}>
      {props.children}
    </div>
  </div>;
}

type StoryState = {
  windowChildren: React.ReactNode[],
  name?: string,
  face?: string
}

// TODO: We can also use another way
// That is, add a tmp var, add to it first, then submit
class Story extends React.Component<{ commandList: CommandList }, StoryState> {
  state: StoryState = {
    windowChildren: []
  }

  appendPrint(print: React.ReactNode) {
    this.setState({
      windowChildren: this.state.windowChildren.concat(print)
    });
  }

  appendWait(second: number) {
    this.setState({
      windowChildren: this.state.windowChildren.concat(<Wait second={second} />)
    });
  }

  render() {
    let windowContext: WindowContext;

    const nodes = this.props.commandList.reduce((prev, curr, idx) => {
      const lastElem = prev[prev.length - 1];
      const key = idx;
      let choiceItem: JSX.Element[];

      switch (curr.command) {
        case CommandName.title:
          document.title = curr.args[0];
          return prev.concat(<Title key={key}>{curr.args[0]}</Title>);
        case CommandName.outline:
          return prev.concat(<Outline key={key}>{ReplacePlayer(curr.args[0])}</Outline>);
        case CommandName.situation:
          return prev.concat(<Situation key={key}>{curr.args[0]}</Situation>);
        case CommandName.charaFull:
          return prev.concat(<CharaFull unitId={curr.args[0]} characterPos={curr.args[1]}
            faceId={FaceId[Number(curr.args[2])] as keyof FaceId} key={key} />);
        case CommandName.print:
          if (windowContext == null)
            windowContext = new WindowContext();
          windowContext.appendPrint(ReplacePlayer(curr.args[1]), curr.args[0]);
          return prev;
        case CommandName.wait:
          if (windowContext == null)
            windowContext = new WindowContext();
          windowContext.appendWait(Number(curr.args[0]));
          return prev;
        case CommandName.choice:
          choiceItem = [<ChoiceItem tag={Number(curr.args[1])} key={key}>{curr.args[0]}</ChoiceItem>];
          if (lastElem?.type === ChoiceList) {
            const newElem = lastElem.props.children.concat(choiceItem);
            prev[prev.length - 1] = <ChoiceList key={lastElem.key}>{newElem}</ChoiceList>;
            return prev;
          }
          return prev.concat(<ChoiceList key={key}>{choiceItem}</ChoiceList>);
        case CommandName.tag:
          return prev.concat(<Tag key={key} tag={Number(curr.args[0])} />);
        case CommandName.background:
          return prev.concat(<Background key={key} file={curr.args[0]} />);
        case CommandName.goto:
          return prev.concat(<Goto tag={Number(curr.args[0])} key={key} />);
        case CommandName.movie:
          return prev.concat(<Movie file={curr.args[0]} key={key} />);
        case CommandName.movieStay:
          return prev.concat(<MovieStay file={curr.args[0]} key={key} />);
        case CommandName.vo:
          if (windowContext == null)
            windowContext = new WindowContext();
          windowContext.appendVoice(curr.args[0]);
          return prev;
        case CommandName.touch:
          if (windowContext != null) {
            const windowContextTemp = windowContext;
            windowContext = new WindowContext();
            return prev.concat(<Window {...windowContextTemp} key={key} />);
          }
          return prev;
        case CommandName.bgm:
          return prev.concat(<Bgm file={curr.args[0]} key={key} />);
        case CommandName.face:
          if (windowContext == null)
            windowContext = new WindowContext();
          windowContext.face = curr.args[0];
          return prev;
        case CommandName.textSize:
          if (windowContext == null)
            windowContext = new WindowContext();
          windowContext.textSize = Number(curr.args[0]);
          return prev;
        case CommandName.windowVisible:
          if (curr.args.length < 1)
            throw new Error('No argument');
          if (curr.args[0] === 'true')
            windowContext = new WindowContext();
          return prev;
        default:
          return prev;
      }
    }, [] as Array<JSX.Element | undefined>);

    return <div>{nodes}</div>;
  }
}


class StoryById extends React.Component<StoryByIdProps, StoryByIdState> {
  state = {
    commandList: [] as CommandList
  }

  async openStory(id: string) {
    if (id == null)
      return;
    const content = await fetch(`https://cdn.jsdelivr.net/gh/KiruyaMomochi/RediveData/storydata/json/${id}.json`);
    const json = await content.json();
    this.setState({ commandList: json });
  }

  componentDidMount() {
    if (this.props.storyId == null)
      return;
    return this.openStory(this.props.storyId);
  }

  async componentDidUpdate(prevProps: StoryByIdProps) {
    if (this.props.storyId != prevProps.storyId && this.props.storyId) {
      return await this.openStory(this.props.storyId);
    }
  }

  render() {
    return <Story commandList={this.state.commandList} />;
  }
}

function StoryViewer(props: { storyId?: string } & RouteProps) {

  const [location, setLocation] = useLocation();

  function SetLocationOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const id = (e.target as HTMLTextAreaElement).value;
    const addr = `/story/${id}`;
    if (addr === location) return;
    setLocation(addr);
  }

  return (
    <>
      <input type="text" onKeyDown={SetLocationOnKeyDown} />
      <StoryById storyId={props.storyId} />
    </>
  );
}

type StoryByIdProps = {
  storyId?: string;
} & RouteProps;

type StoryByIdState = {
  commandList: CommandList;
};

function calculateSetupPoseBounds(skeleton: spine.Skeleton) {
  skeleton.setToSetupPose();
  skeleton.updateWorldTransform();
  const offset = new spine.Vector2();
  const size = new spine.Vector2();
  skeleton.getBounds(offset, size, []);
  return { offset: offset, size: size };
}

async function renderSpine(unitId: string, node: HTMLCanvasElement) {
  const gl = node.getContext('webgl', { alpha: false });

  if (gl == null) {
    throw new Error('WebGL is unavailable');
  }

  gl.clearColor(0xf9 / 0xff, 0xf9 / 0xff, 0xf9 / 0xff, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const mvp = new spine.webgl.Matrix4();
  const mgl = new spine.webgl.ManagedWebGLRenderingContext(gl);

  // Create a simple shader, mesh, model-view-projection matrix, SkeletonRenderer, and AssetManager.
  const shader = spine.webgl.Shader.newTwoColoredTextured(gl);
  const batcher = new spine.webgl.PolygonBatcher(gl);
  mvp.ortho2d(0, 0, node.width - 1, node.height - 1);
  const skeletonRenderer = new spine.webgl.SkeletonRenderer(mgl);
  const assetManager = new spine.webgl.AssetManager(gl);

  const spineFull = 'https://ptt.moe/Assets/assets/_elementsresources/resources/storydata/spine/full/';

  const [, skel, atlas] = await Promise.all(
    [new Promise<HTMLImageElement>(
      (resolve, reject) => assetManager.loadTexture(spineFull + `spine_${unitId}/${unitId}.png`,
        (file, image) => resolve(image),
        (file, error) => reject(error))),
    new Promise<Uint8Array>(
      (resolve, reject) => assetManager.loadBinary(spineFull + `spine_${unitId}/${unitId}.skel.bytes`,
        (file, binary) => resolve(binary),
        (file, error) => reject(error))),
    new Promise<spine.TextureAtlas>(
      (resolve, reject) => assetManager.loadTextureAtlas(spineFull + `spine_${unitId}/${unitId}.atlas.txt`,
        (file, atlas) => resolve(atlas),
        (file, error) => reject(error)))]);

  const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
  const skletonBinary = new spine.SkeletonBinary(atlasLoader);
  skletonBinary.scale = 1;

  const skletonData = skletonBinary.readSkeletonData(skel);
  const skeleton = new spine.Skeleton(skletonData);
  skeleton.setSkinByName('normal');
  const bounds = calculateSetupPoseBounds(skeleton);

  const animationStateData = new spine.AnimationStateData(skeleton.data);
  const animationState = new spine.AnimationState(animationStateData);
  animationState.setAnimation(0, 'eye_idle', true);
  const premultipliedAlpha = true;

  let lastFrameTime = 0;

  function resize() {
    if (node == null) return;
    if (gl == null) return;

    const w = node.clientWidth;
    const h = node.clientHeight;
    if (node.width != w || node.height != h) {
      node.width = w;
      node.height = h;
    }

    // Calculations to center the skeleton in the node.
    const centerX = bounds.offset.x + bounds.size.x / 2;
    const centerY = bounds.offset.y + bounds.size.y / 2;
    const scaleX = bounds.size.x / node.width;
    const scaleY = bounds.size.y / node.height;
    let scale = Math.max(scaleX, scaleY) * 1.2;
    if (scale < 1) scale = 1;
    const width = node.width * scale;
    const height = node.height * scale;

    mvp.ortho2d(centerX - width / 2, centerY - height / 2, width, height);
    gl.viewport(0, 0, node.width, node.height);
  }

  function render() {
    if (node == null) return;
    if (gl == null) return;

    const now = Date.now() / 1000;
    const delta = now - lastFrameTime;
    lastFrameTime = now;

    resize();

    gl.clearColor(0xf9 / 0xff, 0xf9 / 0xff, 0xf9 / 0xff, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    animationState.update(delta);
    animationState.apply(skeleton);
    skeleton.updateWorldTransform();

    shader.bind();

    shader.setUniformi(spine.webgl.Shader.SAMPLER, 0);
    shader.setUniform4x4f(spine.webgl.Shader.MVP_MATRIX, mvp.values);

    batcher.begin(shader);

    skeletonRenderer.premultipliedAlpha = premultipliedAlpha;
    skeletonRenderer.draw(batcher, skeleton);
    batcher.end();

    shader.unbind();

    requestAnimationFrame(render);
  }

  function load() {
    if (assetManager.isLoadingComplete()) {
      requestAnimationFrame(render);
    }
    else {
      requestAnimationFrame(load);
    }
  }
  requestAnimationFrame(load);
}

class SpinePlayer extends React.Component<{ unitId: string } & RouteProps> {
  private ref: React.RefObject<HTMLCanvasElement> = React.createRef();

  async componentDidMount() {
    const node = this.ref.current;
    if (node == null) {
      throw new Error('Node is unavilable');
    }
    await renderSpine(this.props.unitId, node);
  }

  render() {
    return <canvas id='canvas' ref={this.ref} />;
  }
}

function App(): JSX.Element {
  return (
    <>
      <Route path='/spine/:id?'>
        {(params) => params.id == null ? null : <SpinePlayer unitId={params.id} />}
      </Route>
      <Route path='/story/:id?'>
        {
          (params) =>
            <div className="App">
              <StoryViewer storyId={params.id} />
            </div>
        }
      </Route>
    </>
  );
}

export default App;
