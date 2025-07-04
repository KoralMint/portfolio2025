"use client"

import { useState } from "react"
import { ExternalLink, Calendar, Code, Tag, X, Copy, Menu, Mail } from "lucide-react"

// プロジェクトデータの型定義
interface Project {
  id: string
  title: string
  type: string
  featured?: boolean
  description: string
  thumbnail: string
  githubUrl?: string
  demoUrl?: string
  websiteUrl?: string
  period: string
  detailDescription: string
  languages: string[]
  technologies: string[]
}

// プロジェクトデータ
const projects: Project[] = [
  {
    id: "remotephone",
    title: "RemotePhone",
    type: "個人開発 / WIP",
    featured: true,
    description: "Windowsをスマートフォンから遠隔操作",
    thumbnail: "./placeholder.jpg?height=300&width=300",
    githubUrl: "https://github.com/Koranoa3/RemotePhone",
    websiteUrl: "http://skyboxx.tplinkdns.com:8000/",
    period: "2025年4月 - 現在",
    detailDescription:
      "スマートフォンからWindowsパソコンを遠隔操作できるアプリケーションです。\nP2P通信を使用したリアルタイム通信により、トラックパッド操作やキーボード、音量操作を遠隔で行うことができます。\n\nUX,セキュリティ、パフォーマンスに配慮し、ホスト、クライアント、中継サービスをフロント・バック共に設計・実装しました。\n現在、さらなるUX向上を目指して開発中です。",
    languages: ["Python", "JavaScript"],
    technologies: ["WebSocket", "FastAPI", "Docker", "GUI"],
  },
  {
    id: "minecraft-server-agent",
    title: "Minecraft Server Agent",
    type: "個人開発",
    description: "ゲームサーバーをDiscordから電源操作",
    thumbnail: "./placeholder.jpg?height=300&width=300",
    githubUrl: "https://github.com/Koranoa3/mc-server-agent",
    period: "2024年11月 - 2024年12月",
    detailDescription:
      "Discordボットから、Docker上のMinecraftサーバーの起動・停止・オンラインプレイヤー確認を行えるシステムです。\n\ndocker.pyとdiscord.pyを駆使し、複数サーバー対応、起動中等の状態表示、プレイヤー名などをリアルタイムで確認できます。\n操作者のDiscordロールでアクションを制限など、管理のしやすさにも考慮しています。",
    languages: ["Python"],
    technologies: ["Discord", "Docker", "API"],
  },
  {
    id: "delikitchup",
    title: "delikitchup",
    type: "チーム開発",
    description: "MBSDCCコンテストで初めてPython, Gitとチーム開発に挑んだ",
    thumbnail: "./placeholder.jpg?height=300&width=300",
    githubUrl: "https://github.com/Koranoa3/delikitchup",
    period: "2023年10月 - 2023年12月",
    detailDescription:
      "MBSD Cybersecurity Challenges コンテストに参加した際のチーム開発プロジェクトです。\nメインプログラマとして、ツールのアルゴリズムやバージョン管理を学びました。コンテストでは最終審査会まで進出し、他の出場者や現場のセキュリティエンジニアとの交流も行いました。",
    languages: ["Python"],
    technologies: ["クローラー", "Streamlit",  "Selenium", "requests"],
  },
  /*
  {
    id: "tree-ivy",
    title: "Tree-Ivy",
    type: "開発協力",
    description: "学校の時間割・授業管理システムを見やすく・使いやすくする拡張機能",
    thumbnail: "./placeholder.jpg?height=300&width=300",
    period: "2024年7月 - 2024年7月 (協力期間)",
    detailDescription:
      "学校の既存時間割システムのUIを改善するブラウザ拡張機能です。\n\n時間割を直感的で見やすいデザインに変更したほか、カスタマイズメニューを実装する等で開発に貢献しています。",
    languages: ["JavaScript", "CSS"],
    technologies: ["Chrome Extension API", "DOM操作"],
  },
  */
  {
    id: "iwasakiposystem",
    title: "IwasakiPosSystem",
    type: "開発協力",
    description: "学園祭に電子決済導入したくねw 的なノリで始まったレジ決済・管理システム",
    thumbnail: "./placeholder.jpg?height=300&width=300",
    githubUrl: "https://github.com/kurappy-14/iwasakiPosSystem",
    period: "2024年11月, 2025年5月 (協力期間)",
    detailDescription:
      "学園祭での電子決済・売上管理および順番待ちシステムを低コストで実現するシステムです。\n\n設計協力・アルゴリズムの最適化に貢献したほか、学内コンテストに出品した際のスライド・ポスターデザインおよび動画資料の作成に協力しました。",
    languages: ["JavaScript"],
    technologies: ["FastAPI", "SQLite", "QR Code"],
  },
  {
    id: "scratch-projects",
    title: "Scratch Projects",
    type: "個人活動",
    description: "高校時代に熱中したゲーム制作・アルゴリズム学習",
    thumbnail: "./placeholder.jpg?height=300&width=300",
    websiteUrl: "https://scratch.mit.edu/users/Ros_tim/",
    period: "2021年 - 2023年",
    detailDescription:
      "コンピューター部に所属し、Scratchを通じて仲間とプログラミングの基礎を教えあいました。\nゲーム制作のほか、迷路探索アルゴリズムやパーリンノイズ再現などアルゴリズムの学習を行っていました。\n\n現在はPythonやJavaScriptなどの言語に移行していますが、現在もアイデアの視覚化・共有に活用しています。",
    languages: ["Scratch"],
    technologies: ["ゲーム制作", "アルゴリズム学習"],
  },
  {
    id: "design-logo",
    title: "デザイン・ロゴ制作",
    type: "個人活動",
    description: "中学生の頃からIllustratorいじり",
    thumbnail: "./placeholder.jpg?height=300&width=300",
    period: "2018年 - 現在",
    detailDescription:
      "中学生の頃からAdobe Illustratorを使用してロゴデザインやグラフィックデザインを手がけています。\nプロジェクトや身内のデザイン・ロゴ制作、地域のお店・ブランドのロゴ制作などに携わってきました。",
    languages: [],
    technologies: ["Adobe Illustrator", "デザイン"],
  },
]

// プロフィールアイコンのURL（指定がない場合は表示しない）
const profileIconUrl = "https://avatars.githubusercontent.com/u/140129280?v=4"

// スキルデータの定義を追加
const skillsData = {
  languages: [
    { name: "Python", featured: true, icon: "icon/python.png" }, // iconにURLを指定
    { name: "JavaScript", featured: true, icon: "icon/javascript.png" },
    { name: "Scratch", featured: false, icon: "icon/scratch.svg" },
    { name: "Java", featured: false, icon: "icon/java.png" },
    { name: "C#(Unity)", featured: false, icon: "icon/csharp.png" },
    { name: "Lua", featured: false, icon: "icon/lua.png" },
  ],
  creative: [
    { name: "Illustrator", featured: true, icon: "icon/illustrator.webp" },
    { name: "Photoshop", featured: false, icon: "icon/photoshop.png" },
    { name: "Blender", featured: false, icon: "icon/blender.png" },
    { name: "Unity", featured: false, icon: "icon/unity.png" },
  ],
  devtools: [
    { name: "Git / Github", featured: false, icon: "icon/git.png" },
    { name: "Docker", featured: false, icon: "icon/docker.png" },
    { name: "Linux", featured: false, icon: "icon/linux.webp" },
  ],
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectDetail = () => {
    setSelectedProject(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* ナビゲーション */}
      <nav className="sticky top-0 z-40 bg-primary/95 backdrop-blur-sm border-b border-secondary shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-accent">白葉太陽</div>

            {/* デスクトップメニュー */}
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="hover:text-accent transition-colors">
                About
              </a>
              <a href="#skills" className="hover:text-accent transition-colors">
                Skills
              </a>
              <a href="#projects" className="hover:text-accent transition-colors">
                Projects
              </a>
              <a href="#links" className="hover:text-accent transition-colors">
                Links
              </a>
            </div>

            {/* ハンバーガーメニューボタン */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* モバイルメニュー */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-secondary">
              <div className="flex flex-col space-y-2 pt-4">
                <a
                  href="#about"
                  onClick={closeMobileMenu}
                  className="block py-2 px-4 rounded-lg hover:bg-secondary hover:text-accent transition-colors"
                >
                  About
                </a>
                <a
                  href="#skills"
                  onClick={closeMobileMenu}
                  className="block py-2 px-4 rounded-lg hover:bg-secondary hover:text-accent transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  onClick={closeMobileMenu}
                  className="block py-2 px-4 rounded-lg hover:bg-secondary hover:text-accent transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#links"
                  onClick={closeMobileMenu}
                  className="block py-2 px-4 rounded-lg hover:bg-secondary hover:text-accent transition-colors"
                >
                  Links
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Eye-catch */}
      <section className="py-20 px-4 shadow-lg">
        <div className="container mx-auto text-center">
          {profileIconUrl && (
            <a
              href="https://github.com/Koranoa3" // プロフィールページのURLを設定
              target="_blank"
              rel="noopener noreferrer"
              className="block w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            >
              <img
                src={profileIconUrl || "./placeholder.jpg"}
                alt="プロフィールアイコン"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </a>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-accent">白葉 太陽</h1>
          <p className="text-lg md:text-xl text-gray-300">
            <span className="inline-block">色々な「便利」を追求する</span>
            <span className="inline-block">のが好きな学生です。</span>
          </p>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-20 px-4 shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent">About Me</h2>
          <div className="max-w-6xl mx-auto">
            <div className="bg-secondary rounded-lg p-8 shadow-xl transition-shadow duration-300">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="grid-cols-1 md:grid-cols-2 gap-6">
                  <h3 className="text-xl font-bold mb-4 text-accent">基本情報</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">名前:</span> 白葉 太陽
                    </p>
                    <p>
                      <span className="font-semibold">所属:</span> 情報科学専門学校
                    </p>
                    <p>
                      <span className="font-semibold">資格:</span> FE, 英検2級
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <h3 className="text-xl font-bold mb-4 text-accent">自己紹介</h3>
                  <p className="text-gray-300 leading-relaxed">
                    ご覧いただきありがとうございます。<br />
                    作業を効率化したり、身の回りの不便を解消できるような、便利なものを作るのが好きな情報学生です。ソフトウェア、3D印刷物、IoTにサーバーなど、分野問わずに手を出しています。<br />
                    <br />
                    中学からプログラミングを始め、現在は主にPythonやweb技術を中心に個人開発やチーム開発に取り組んでいます。<br />
                    常に新しい技術を学び、開発の幅を広げることに情熱を持っています。<br />
                    <br />
                    趣味は主にサンドボックスゲーム、グラフィックデザインです。
                    技術、趣味ともにクリエイティブな活動を通じて、アイデアを形にすることが好きです。<br />
                    便利で使いやすいものを目指して、日々学び続けています。<br />

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Set */}
      <section id="skills" className="py-20 px-4 shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent">Skill Set</h2>

          {/* Languages */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-accent">Languages</h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skillsData.languages.map((skill) => (
                <div
                  key={skill.name}
                  className={`bg-tertiary rounded-lg p-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                    skill.featured ? "border-2 border-accent bg-accent/10" : "border border-transparent"
                  }`}
                >
                  {skill.icon ? (
                    <img
                      src={skill.icon || "./placeholder.jpg"}
                      alt={skill.name}
                      className="w-12 h-12 mb-3 object-contain rounded select-none"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-primary mb-3 text-lg">
                      {skill.name.charAt(0)}
                    </div>
                  )}
                  <p className={`font-bold text-center text-sm ${skill.featured ? "text-accent" : "text-white"}`}>
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Creative */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-accent">Creative</h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skillsData.creative.map((skill) => (
                <div
                  key={skill.name}
                  className={`bg-tertiary rounded-lg p-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                    skill.featured ? "border-2 border-accent bg-accent/10" : "border border-transparent"
                  }`}
                >
                  {skill.icon ? (
                    <img
                      src={skill.icon || "./placeholder.jpg"}
                      alt={skill.name}
                      className="w-12 h-12 mb-3 object-contain rounded select-none"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-primary mb-3 text-lg">
                      {skill.name.charAt(0)}
                    </div>
                  )}
                  <p className={`font-bold text-center text-sm ${skill.featured ? "text-accent" : "text-white"}`}>
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-accent">DevTools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skillsData.devtools.map((skill) => (
                <div
                  key={skill.name}
                  className={`bg-tertiary rounded-lg p-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                    skill.featured ? "border-2 border-accent bg-accent/10" : "border border-transparent"
                  }`}
                >
                  {skill.icon ? (
                    <img
                      src={skill.icon || "./placeholder.jpg"}
                      alt={skill.name}
                      className="w-12 h-12 mb-3 object-contain rounded select-none"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-primary mb-3 text-lg">
                      {skill.name.charAt(0)}
                    </div>
                  )}
                  <p className={`font-bold text-center text-sm ${skill.featured ? "text-accent" : "text-white"}`}>
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-4 shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent">My/Our Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectDetail(project)}
                className={`bg-secondary rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-2 group ${
                    project.featured ? "border-2 border-accent bg-accent/10" : "border border-transparent"}`}
              >
                <div className="w-full h-48 bg-accent/20 rounded-lg mb-4 overflow-hidden relative">
                  <img
                    src={project.thumbnail || "./placeholder.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* 右上三角形の影 - グラデーション版 */}
                  <div
                    className="absolute inset-0 group-hover:translate-y-[-100%] transition-transform duration-300"
                    style={{
                      background:
                        "linear-gradient(to top right, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.05) 100%)",
                    }}
                  ></div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-accent group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-accent/80 mb-2">{project.type}</p>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-xl">And more...</p>
          </div>
        </div>
      </section>

      {/* Links */}
      <section id="links" className="py-12 md:py-20 px-4 shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-accent">Links</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6 md:mb-8">
            {[
              {
                icon: () => (
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.832.092-.647.35-1.087.636-1.338-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                ),
                label: "GitHub",
                href: "https://github.com/Koranoa3"
                },
                {
                icon: () => (
                  // Discord SVG icon from simpleicons.org
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.074.074 0 0 0-.079.037c-.34.607-.719 1.396-.984 2.013a18.267 18.267 0 0 0-5.456 0 12.51 12.51 0 0 0-.997-2.013.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.069.069 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.104 1.547 4.13 2.488 6.102 3.115a.077.077 0 0 0 .084-.027c.472-.65.893-1.34 1.248-2.062a.076.076 0 0 0-.041-.104c-.662-.251-1.292-.549-1.899-.892a.077.077 0 0 1-.008-.127c.127-.096.254-.192.375-.291a.074.074 0 0 1 .077-.01c3.981 1.813 8.285 1.813 12.223 0a.073.073 0 0 1 .078.009c.122.099.248.196.376.292a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.9.891.076.076 0 0 0-.04.105c.36.722.78 1.412 1.247 2.061a.076.076 0 0 0 .084.028c1.978-.627 4.004-1.568 6.107-3.115a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 0 0-.03-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.218 0 2.175 1.102 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.218 0 2.175 1.102 2.157 2.418 0 1.334-.939 2.419-2.157 2.419Z"/>
                  </svg>
                ),
                label: "Discord",
                href: "https://discord.com/users/445347028508213249"
                },
                {
                icon: () => (
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
                label: "X",
                href: "https://x.com/Koral_mint",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="bg-secondary rounded-lg p-4 sm:p-6 shadow-lg transition-shadow duration-300 group w-full sm:w-auto max-w-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex sm:flex-col items-center gap-3 sm:gap-0">
                  <div className="text-accent group-hover:text-white transition-colors sm:mb-2">
                    {link.icon()}
                  </div>
                  <p className="text-center font-semibold">{link.label}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Email Copy Field */}
          <div className="max-w-md mx-auto">
            <div className="bg-secondary rounded-xl p-3 flex items-center gap-3 shadow-lg">
              <Mail className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-gray-300 text-sm sm:text-base truncate flex-1">aitaiyosora300@gmail.com</span>
              <button
                onClick={(event) => {
                  navigator.clipboard.writeText("aitaiyosora300@gmail.com")
                  // 簡単なフィードバック表示
                  const button = (event.target as Element).closest("button")
                  if (button) {
                    const originalText = button.innerHTML
                    button.innerHTML =
                      '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>'
                    setTimeout(() => {
                      button.innerHTML = originalText
                    }, 1000)
                  }
                }}
                className="flex items-center gap-2 bg-accent text-primary px-3 py-2 rounded-lg hover:bg-white transition-colors font-semibold flex-shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-secondary text-center shadow-lg">
        <p className="text-gray-400">© 2025 白葉太陽. All Rights Reserved.</p>
      </footer>

      {/* プロジェクト詳細パネル */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={(e) => {
            // 背景をクリックした場合のみ閉じる
            if (e.target === e.currentTarget) {
              closeProjectDetail()
            }
          }}
        >
          <div className="bg-secondary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-500 shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-accent mb-2">{selectedProject.title}</h3>
                  <p className="text-accent/80">{selectedProject.type}</p>
                </div>
                <button onClick={closeProjectDetail} className="p-2 hover:bg-tertiary rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProject.thumbnail || "./placeholder.jpg"}
                    alt={selectedProject.title}
                    className="w-full aspect-square object-cover rounded-lg mb-4"
                  />

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-tertiary px-3 py-2 rounded-lg hover:bg-accent hover:text-primary transition-colors"
                      >
                        {/* GitHub SVG icon from simpleicons.org */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.832.092-.647.35-1.087.636-1.338-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-tertiary px-3 py-2 rounded-lg hover:bg-accent hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        デモ
                      </a>
                    )}
                    {selectedProject.websiteUrl && (
                      <a
                        href={selectedProject.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-tertiary px-3 py-2 rounded-lg hover:bg-accent hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        ホームページ
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-gray-300 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedProject.period}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3 text-accent">説明</h4>
                  <p className="text-gray-300 mb-6 leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                    {selectedProject.detailDescription}
                  </p>

                  {selectedProject.languages.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-bold mb-2 text-accent flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        使用言語
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.languages.map((lang) => (
                          <span key={lang} className="bg-tertiary px-3 py-1 rounded-full text-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-bold mb-2 text-accent flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      キーワード技術
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
