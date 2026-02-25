// ── Survivor build database ────────────────────────────────────────────────
// v2 – Full per-variant, per-mode, per-team builds
//
// Data model per variant:
//   standard  { hint, core[], add[], luxury[] }   – team play
//   eclipse   { hint, core[], add[], luxury[] }   – team Eclipse 5+
//   prismatic { hint, core[], add[], luxury[] }   – team Prismatic Trials
//   solo.standard  { hint, core[], add[], luxury[] }
//   solo.eclipse   { hint, core[], add[], luxury[] }
//   solo.prismatic { hint, core[], add[], luxury[] }
//
// Design philosophy:
//   Standard  – balanced damage + utility, assumes teammates share aggro
//   Eclipse   – survival-first: barrier, debuff immunity, flat DR; assumes
//               E5+ (permanent damage, ally healing halved, -50% HP curse)
//   Prismatic – speed-kill: openers, movement, fast teleporter
//   Solo      – self-reliant: on-kill items scale faster (all kills yours),
//               survival floor added, no revives
//   Solo Eclipse – hardest combo: minimal damage core, maximal survival
//   Solo Prismatic – speed with a safety net
// ────────────────────────────────────────────────────────────────────────────
module.exports = [
  /* ================================================================
   *  COMMANDO
   * ================================================================ */
  {
    name: 'Commando',
    variants: [
      {
        style: 'Proc Chain',
        role: 'proc DPS',
        standard: {
          hint: 'Fast-hit scaling: stack proc chains and crit for exponential damage.',
          core: ['syringe', 'glasses', 'atg', 'ukulele', 'shrimp', 'clover'],
          add: ['pred', 'scythe', 'watch', 'icbm'],
          luxury: ['shatterspleen', 'molten', 'gesture', 'tonic', 'crown'],
        },
        eclipse: {
          hint: 'Double Tap proc chains still carry, but you need barrier cycling to survive E5+ permanent damage. Topaz Brooch on every kill + Infusion to counter the HP curse.',
          core: [
            'syringe',
            'glasses',
            'atg',
            'topazbrooch',
            'tougher',
            'infusion',
          ],
          add: ['ukulele', 'scythe', 'raincoat', 'repulsion'],
          luxury: ['shatterspleen', 'aegis', 'clover', 'icbm', 'stealthkit'],
        },
        prismatic: {
          hint: 'Speed-kill the teleporter. Crowbar openers + bands burst bosses. Move fast between stages.',
          core: ['crowbar', 'syringe', 'bands', 'bandk', 'hoof', 'atg'],
          add: ['glasses', 'ukulele', 'drink', 'mocha'],
          luxury: ['clover', 'icbm', 'convergence', 'shatterspleen', 'quail'],
        },
        solo: {
          standard: {
            hint: 'All aggro on you but all kills are yours — on-kill items scale twice as fast. Topaz Brooch barrier cycling is your sustain.',
            core: [
              'syringe',
              'glasses',
              'atg',
              'ukulele',
              'topazbrooch',
              'scythe',
            ],
            add: ['pred', 'tougher', 'clover', 'icbm'],
            luxury: ['shatterspleen', 'molten', 'aegis', 'shrimp', 'infusion'],
          },
          eclipse: {
            hint: 'Hardest combo. Proc chains still work but you must survive alone with E5+ curses. Barrier cycling is mandatory — every kill must generate barrier.',
            core: [
              'syringe',
              'glasses',
              'topazbrooch',
              'tougher',
              'infusion',
              'repulsion',
            ],
            add: ['atg', 'scythe', 'raincoat', 'stealthkit'],
            luxury: ['aegis', 'ukulele', 'clover', 'safer', 'medkit'],
          },
          prismatic: {
            hint: 'Speed build with a solo safety net. Topaz Brooch covers sustain while you rush.',
            core: [
              'crowbar',
              'syringe',
              'bands',
              'bandk',
              'hoof',
              'topazbrooch',
            ],
            add: ['atg', 'glasses', 'drink', 'tougher'],
            luxury: ['clover', 'icbm', 'convergence', 'scythe', 'quail'],
          },
        },
      },
      {
        style: 'Crit Bleed',
        role: 'bleed DPS',
        standard: {
          hint: 'Stack crit to 100%, let Shatterspleen carry. Clover rerolls everything.',
          core: [
            'glasses',
            'pred',
            'laser',
            'dagger',
            'clover',
            'shatterspleen',
          ],
          add: ['syringe', 'scythe', 'atg', 'watch'],
          luxury: ['behemoth', 'icbm', 'gesture', 'tonic', 'crown'],
        },
        eclipse: {
          hint: 'Bleed still scales but you need defense layers. Scythe crit-heals bypass Eclipse restrictions partially. Infusion counters the HP curse.',
          core: ['glasses', 'pred', 'dagger', 'scythe', 'tougher', 'infusion'],
          add: ['laser', 'topazbrooch', 'raincoat', 'repulsion'],
          luxury: ['shatterspleen', 'clover', 'aegis', 'stealthkit', 'safer'],
        },
        prismatic: {
          hint: 'Crit bleed melts bosses fast. Stack crit cap quickly, add burst openers.',
          core: [
            'glasses',
            'pred',
            'laser',
            'dagger',
            'crowbar',
            'shatterspleen',
          ],
          add: ['syringe', 'hoof', 'bands', 'mocha'],
          luxury: ['clover', 'behemoth', 'convergence', 'drink', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Solo bleed is strong — every kill proc feeds your crit chain. Add sustain since you take all aggro.',
            core: [
              'glasses',
              'pred',
              'laser',
              'dagger',
              'scythe',
              'topazbrooch',
            ],
            add: ['syringe', 'tougher', 'clover', 'shatterspleen'],
            luxury: ['behemoth', 'icbm', 'aegis', 'infusion', 'knurl'],
          },
          eclipse: {
            hint: 'Bare minimum damage core — bleed does the heavy lifting. Stack every defensive layer available.',
            core: [
              'glasses',
              'dagger',
              'scythe',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['pred', 'raincoat', 'repulsion', 'stealthkit'],
            luxury: ['shatterspleen', 'aegis', 'clover', 'safer', 'knurl'],
          },
          prismatic: {
            hint: 'Bleed + speed. Shatterspleen explosions chain-clear stages fast.',
            core: ['glasses', 'pred', 'laser', 'dagger', 'crowbar', 'hoof'],
            add: ['syringe', 'topazbrooch', 'bands', 'mocha'],
            luxury: [
              'shatterspleen',
              'clover',
              'convergence',
              'drink',
              'quail',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  HUNTRESS
   * ================================================================ */
  {
    name: 'Huntress',
    variants: [
      {
        style: 'Ballista Burst',
        role: 'mobile burst',
        standard: {
          hint: 'Backup Mag for extra Ballista charges. Bands + crowbar for opener burst.',
          core: ['crowbar', 'backupmag', 'bands', 'bandk', 'feather', 'atg'],
          add: ['glasses', 'clover', 'ukulele', 'watch'],
          luxury: [
            'shatterspleen',
            'littledisciple',
            'gesture',
            'strides',
            'convergence',
          ],
        },
        eclipse: {
          hint: 'Huntress has the lowest HP pool — Eclipse permanent damage is lethal. Stealthkit is your lifeline. Feather mandatory for escape routes.',
          core: [
            'crowbar',
            'backupmag',
            'bands',
            'feather',
            'stealthkit',
            'tougher',
          ],
          add: ['bandk', 'raincoat', 'safer', 'infusion'],
          luxury: ['atg', 'clover', 'aegis', 'topazbrooch', 'repulsion'],
        },
        prismatic: {
          hint: 'Ballista burst deletes bosses. Stack pure opener damage + movement for stage rush.',
          core: ['crowbar', 'backupmag', 'bands', 'bandk', 'hoof', 'feather'],
          add: ['atg', 'glasses', 'drink', 'quail'],
          luxury: [
            'clover',
            'convergence',
            'littledisciple',
            'mocha',
            'strides',
          ],
        },
        solo: {
          standard: {
            hint: 'Huntress is naturally mobile — abuse that solo. Feather + sprint items keep you untouchable. On-kill barrier patches sustain.',
            core: [
              'crowbar',
              'backupmag',
              'bands',
              'bandk',
              'feather',
              'topazbrooch',
            ],
            add: ['atg', 'glasses', 'tougher', 'stealthkit'],
            luxury: [
              'shatterspleen',
              'clover',
              'littledisciple',
              'strides',
              'aegis',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Huntress is brutal — lowest HP, all aggro on you. Maximize escape tools. Stealthkit + Feather + Safer Spaces are non-negotiable.',
            core: [
              'feather',
              'stealthkit',
              'tougher',
              'safer',
              'infusion',
              'topazbrooch',
            ],
            add: ['crowbar', 'bands', 'raincoat', 'repulsion'],
            luxury: ['aegis', 'backupmag', 'clover', 'bandk', 'medkit'],
          },
          prismatic: {
            hint: 'Sprint constantly — Huntress auto-aims while moving. Stack speed and burst openers.',
            core: ['crowbar', 'backupmag', 'bands', 'bandk', 'hoof', 'feather'],
            add: ['atg', 'topazbrooch', 'drink', 'quail'],
            luxury: [
              'clover',
              'convergence',
              'littledisciple',
              'mocha',
              'tougher',
            ],
          },
        },
      },
      {
        style: 'Chain Clear',
        role: 'mobile clear',
        standard: {
          hint: 'Stay moving; Glaive + procs clear entire screens.',
          core: ['hoof', 'feather', 'ukulele', 'wisp', 'atg', 'polylute'],
          add: ['glasses', 'clover', 'bandk', 'gasoline'],
          luxury: [
            'littledisciple',
            'tesla',
            'gesture',
            'strides',
            'convergence',
          ],
        },
        eclipse: {
          hint: 'Chain Clear keeps you moving which is Eclipse-optimal. Layer defensive items into the proc chain.',
          core: ['hoof', 'feather', 'ukulele', 'wisp', 'tougher', 'stealthkit'],
          add: ['atg', 'safer', 'raincoat', 'infusion'],
          luxury: ['polylute', 'clover', 'aegis', 'topazbrooch', 'repulsion'],
        },
        prismatic: {
          hint: 'Chain clear is already speed-oriented. Add convergence and pure movement.',
          core: ['hoof', 'feather', 'ukulele', 'wisp', 'gasoline', 'drink'],
          add: ['atg', 'mocha', 'quail', 'polylute'],
          luxury: [
            'littledisciple',
            'tesla',
            'convergence',
            'berzerker',
            'daggerred',
          ],
        },
        solo: {
          standard: {
            hint: 'Chain clear excels solo — every kill triggers wisp + gasoline chains. Sustain through Topaz barrier.',
            core: ['hoof', 'feather', 'ukulele', 'wisp', 'topazbrooch', 'atg'],
            add: ['gasoline', 'clover', 'tougher', 'polylute'],
            luxury: [
              'littledisciple',
              'tesla',
              'daggerred',
              'strides',
              'aegis',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse chain clear — constant movement is your defense. Topaz Brooch on every kill keeps barrier up.',
            core: [
              'hoof',
              'feather',
              'ukulele',
              'topazbrooch',
              'tougher',
              'infusion',
            ],
            add: ['wisp', 'stealthkit', 'raincoat', 'safer'],
            luxury: ['aegis', 'clover', 'polylute', 'repulsion', 'atg'],
          },
          prismatic: {
            hint: 'Solo speed clear — chain reactions obliterate stages. Topaz for bare minimum sustain.',
            core: ['hoof', 'feather', 'ukulele', 'wisp', 'gasoline', 'drink'],
            add: ['atg', 'topazbrooch', 'mocha', 'quail'],
            luxury: [
              'littledisciple',
              'tesla',
              'convergence',
              'berzerker',
              'daggerred',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  BANDIT
   * ================================================================ */
  {
    name: 'Bandit',
    variants: [
      {
        style: 'Backstab Burst',
        role: 'burst reset',
        standard: {
          hint: 'Backstab burst + Lights Out reset rhythm. Frontload all damage.',
          core: ['crowbar', 'rounds', 'backupmag', 'watch', 'bands', 'bandk'],
          add: ['laser', 'justice', 'clover', 'feather'],
          luxury: ['shatterspleen', 'glass', 'convergence', 'crown'],
        },
        eclipse: {
          hint: 'Lights Out reset gives life on kill which is Eclipse-crucial. Stealth on kill from kit protects between resets.',
          core: [
            'crowbar',
            'rounds',
            'watch',
            'topazbrooch',
            'stealthkit',
            'infusion',
          ],
          add: ['bands', 'bandk', 'raincoat', 'tougher'],
          luxury: ['clover', 'justice', 'aegis', 'repulsion', 'safer'],
        },
        prismatic: {
          hint: 'Burst builds excel in Prismatic. Frontload openers for instant boss deletes.',
          core: ['crowbar', 'rounds', 'watch', 'bands', 'bandk', 'glass'],
          add: ['hoof', 'drink', 'backupmag', 'laser'],
          luxury: ['clover', 'convergence', 'shatterspleen', 'mocha', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Lights Out resets are even better solo — every kill is your reset. Stealth on kill keeps you safe between combos.',
            core: [
              'crowbar',
              'rounds',
              'watch',
              'bands',
              'bandk',
              'topazbrooch',
            ],
            add: ['laser', 'stealthkit', 'tougher', 'clover'],
            luxury: [
              'shatterspleen',
              'glass',
              'convergence',
              'justice',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Bandit relies on Lights Out kill chains for survival. Stealthkit + Topaz barrier cycle between kills.',
            core: [
              'crowbar',
              'rounds',
              'topazbrooch',
              'stealthkit',
              'infusion',
              'tougher',
            ],
            add: ['watch', 'bands', 'raincoat', 'repulsion'],
            luxury: ['clover', 'aegis', 'justice', 'safer', 'medkit'],
          },
          prismatic: {
            hint: 'Solo Prismatic burst — one-shot bosses, stealth out. Topaz for solo safety.',
            core: ['crowbar', 'rounds', 'watch', 'bands', 'bandk', 'hoof'],
            add: ['glass', 'topazbrooch', 'drink', 'laser'],
            luxury: [
              'clover',
              'convergence',
              'shatterspleen',
              'mocha',
              'quail',
            ],
          },
        },
      },
      {
        style: 'Hemorrhage DoT',
        role: 'bleed sustain',
        standard: {
          hint: 'Stack hemorrhage via Desperado crits. Sustained boss damage over time.',
          core: [
            'glasses',
            'pred',
            'laser',
            'dagger',
            'clover',
            'shatterspleen',
          ],
          add: ['syringe', 'scythe', 'crowbar', 'rounds'],
          luxury: ['behemoth', 'scorpion', 'glass', 'crown'],
        },
        eclipse: {
          hint: 'Hemorrhage DoT is Eclipse-friendly — damage ticks while you hide. Scythe for crit healing.',
          core: ['glasses', 'pred', 'dagger', 'scythe', 'tougher', 'infusion'],
          add: ['laser', 'topazbrooch', 'raincoat', 'stealthkit'],
          luxury: ['shatterspleen', 'clover', 'aegis', 'repulsion', 'safer'],
        },
        prismatic: {
          hint: 'Hemorrhage stacks melt bosses while you clear. Stack crit + movement.',
          core: ['glasses', 'pred', 'laser', 'dagger', 'crowbar', 'hoof'],
          add: ['syringe', 'bands', 'drink', 'mocha'],
          luxury: [
            'shatterspleen',
            'clover',
            'convergence',
            'behemoth',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo hemorrhage is strong — every kill feeds bleed stacks. Scythe crit-heal keeps you alive.',
            core: [
              'glasses',
              'pred',
              'laser',
              'dagger',
              'scythe',
              'topazbrooch',
            ],
            add: ['syringe', 'tougher', 'clover', 'shatterspleen'],
            luxury: ['behemoth', 'scorpion', 'aegis', 'infusion', 'knurl'],
          },
          eclipse: {
            hint: 'Solo Eclipse hemorrhage — DoT ticks while you kite. Scythe crit-heal + Topaz barrier for sustain.',
            core: [
              'glasses',
              'dagger',
              'scythe',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['pred', 'raincoat', 'stealthkit', 'repulsion'],
            luxury: ['shatterspleen', 'clover', 'aegis', 'safer', 'knurl'],
          },
          prismatic: {
            hint: 'Solo Prismatic bleed — Topaz provides safety net while DoT clears.',
            core: ['glasses', 'pred', 'laser', 'dagger', 'crowbar', 'hoof'],
            add: ['syringe', 'topazbrooch', 'drink', 'mocha'],
            luxury: [
              'shatterspleen',
              'clover',
              'convergence',
              'behemoth',
              'quail',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  MUL-T
   * ================================================================ */
  {
    name: 'MUL-T',
    variants: [
      {
        style: 'Nailgun Proc',
        role: 'sustained gunner',
        standard: {
          hint: 'Nailgun fires extremely fast — proc chains scale insanely.',
          core: ['syringe', 'mocha', 'atg', 'ukulele', 'shrimp', 'icbm'],
          add: ['glasses', 'clover', 'justice', 'tougher'],
          luxury: ['shatterspleen', 'molten', 'gesture', 'tonic', 'knurl'],
        },
        eclipse: {
          hint: 'MUL-T has high base HP — Armor Plates are very efficient. Retool swap gives tactical defense. Nailgun procs still carry.',
          core: [
            'syringe',
            'atg',
            'ukulele',
            'tougher',
            'repulsion',
            'infusion',
          ],
          add: ['mocha', 'raincoat', 'topazbrooch', 'stealthkit'],
          luxury: ['icbm', 'clover', 'aegis', 'shrimp', 'safer'],
        },
        prismatic: {
          hint: 'Nailgun proc variant is fastest for Prismatic. Quail + Transport Mode = max stage speed.',
          core: ['syringe', 'mocha', 'atg', 'ukulele', 'hoof', 'shrimp'],
          add: ['glasses', 'drink', 'quail', 'icbm'],
          luxury: [
            'clover',
            'convergence',
            'shatterspleen',
            'berzerker',
            'molten',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo MUL-T is tanky — high base HP + Retool swap. All kills feed proc chains faster. Add barrier cycling.',
            core: [
              'syringe',
              'mocha',
              'atg',
              'ukulele',
              'topazbrooch',
              'tougher',
            ],
            add: ['glasses', 'clover', 'icbm', 'shrimp'],
            luxury: ['shatterspleen', 'molten', 'aegis', 'infusion', 'knurl'],
          },
          eclipse: {
            hint: 'Solo Eclipse MUL-T — high base HP makes armor plates extremely efficient. Barrier cycle through Topaz.',
            core: [
              'syringe',
              'atg',
              'tougher',
              'repulsion',
              'infusion',
              'topazbrooch',
            ],
            add: ['ukulele', 'raincoat', 'stealthkit', 'safer'],
            luxury: ['aegis', 'clover', 'icbm', 'knurl', 'medkit'],
          },
          prismatic: {
            hint: 'Solo Prismatic MUL-T — Transport Mode + Quail for fastest traversal. Topaz sustain.',
            core: ['syringe', 'mocha', 'atg', 'ukulele', 'hoof', 'topazbrooch'],
            add: ['glasses', 'drink', 'quail', 'icbm'],
            luxury: ['clover', 'convergence', 'shrimp', 'tougher', 'berzerker'],
          },
        },
      },
      {
        style: 'Rebar Sniper',
        role: 'burst puncher',
        standard: {
          hint: 'Rebar Puncher plays like Railgunner lite. Stack opener damage.',
          core: ['crowbar', 'rounds', 'bands', 'bandk', 'watch', 'laser'],
          add: ['glasses', 'clover', 'feather', 'justice'],
          luxury: ['shatterspleen', 'glass', 'convergence', 'crown'],
        },
        eclipse: {
          hint: 'Rebar burst + Retool swap for defense. High base HP lets armor plates shine.',
          core: [
            'crowbar',
            'rounds',
            'bands',
            'tougher',
            'repulsion',
            'infusion',
          ],
          add: ['watch', 'bandk', 'raincoat', 'stealthkit'],
          luxury: ['laser', 'clover', 'aegis', 'justice', 'safer'],
        },
        prismatic: {
          hint: 'Rebar one-shots with enough openers. Stack burst damage + speed.',
          core: ['crowbar', 'rounds', 'bands', 'bandk', 'watch', 'hoof'],
          add: ['laser', 'glass', 'drink', 'mocha'],
          luxury: [
            'clover',
            'convergence',
            'shatterspleen',
            'justice',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Rebar sniper — pick off targets from range. Topaz on-kill sustain between punches.',
            core: [
              'crowbar',
              'rounds',
              'bands',
              'bandk',
              'watch',
              'topazbrooch',
            ],
            add: ['laser', 'glasses', 'tougher', 'clover'],
            luxury: ['shatterspleen', 'glass', 'justice', 'infusion', 'knurl'],
          },
          eclipse: {
            hint: 'Solo Eclipse Rebar — burst from safety. Armor plates + barrier cycling.',
            core: [
              'crowbar',
              'rounds',
              'tougher',
              'repulsion',
              'infusion',
              'topazbrooch',
            ],
            add: ['bands', 'bandk', 'raincoat', 'stealthkit'],
            luxury: ['aegis', 'clover', 'laser', 'safer', 'knurl'],
          },
          prismatic: {
            hint: 'Solo Prismatic Rebar — burst bosses, Topaz sustain between stages.',
            core: ['crowbar', 'rounds', 'bands', 'bandk', 'watch', 'hoof'],
            add: ['laser', 'topazbrooch', 'drink', 'mocha'],
            luxury: ['clover', 'convergence', 'glass', 'justice', 'quail'],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  ENGINEER
   * ================================================================ */
  {
    name: 'Engineer',
    variants: [
      {
        style: 'Stationary Turrets',
        role: 'turret scaling',
        standard: {
          hint: 'Bustling Fungus + turret inheritance. Plant turrets on the teleporter and wait.',
          core: ['fungus', 'atg', 'ukulele', 'tougher', 'clover', 'icbm'],
          add: ['nkuhana', 'rack', 'behemoth', 'fuel'],
          luxury: ['knurl', 'nucleus', 'spark', 'convergence', 'aegis'],
        },
        eclipse: {
          hint: 'Eclipse halves ally healing so Fungus heals less — compensate with Aegis barrier conversion and extra flat defense.',
          core: [
            'fungus',
            'atg',
            'ukulele',
            'tougher',
            'topazbrooch',
            'infusion',
          ],
          add: ['raincoat', 'repulsion', 'clover', 'safer'],
          luxury: ['aegis', 'nkuhana', 'rack', 'icbm', 'knurl'],
        },
        prismatic: {
          hint: 'Stationary turrets + Focused Convergence = fastest teleporter events. Plant and rush.',
          core: ['fungus', 'atg', 'ukulele', 'hoof', 'convergence', 'icbm'],
          add: ['clover', 'behemoth', 'drink', 'mocha'],
          luxury: ['knurl', 'nucleus', 'spark', 'nkuhana', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Solo Engi — turrets are aggro sponges while you stay safe. Fungus keeps them alive. Stack turret damage.',
            core: [
              'fungus',
              'atg',
              'ukulele',
              'tougher',
              'topazbrooch',
              'clover',
            ],
            add: ['icbm', 'nkuhana', 'rack', 'infusion'],
            luxury: ['knurl', 'nucleus', 'aegis', 'spark', 'convergence'],
          },
          eclipse: {
            hint: 'Solo Eclipse Engi — turrets tank aggro for you. Stack personal defense; Fungus still works on turrets even halved.',
            core: [
              'fungus',
              'atg',
              'tougher',
              'topazbrooch',
              'infusion',
              'repulsion',
            ],
            add: ['ukulele', 'raincoat', 'safer', 'clover'],
            luxury: ['aegis', 'nkuhana', 'rack', 'knurl', 'medkit'],
          },
          prismatic: {
            hint: 'Solo Prismatic Engi — turrets hold point while you rush. Convergence for fast teleporter.',
            core: [
              'fungus',
              'atg',
              'ukulele',
              'hoof',
              'convergence',
              'topazbrooch',
            ],
            add: ['icbm', 'clover', 'drink', 'mocha'],
            luxury: ['knurl', 'nucleus', 'spark', 'behemoth', 'quail'],
          },
        },
      },
      {
        style: 'Mobile Turrets',
        role: 'walking turret aggro',
        standard: {
          hint: 'Walking turrets move with you — Fungus is useless. Stack damage and proc.',
          core: ['syringe', 'atg', 'ukulele', 'shrimp', 'clover', 'icbm'],
          add: ['glasses', 'pred', 'wisp', 'lysate'],
          luxury: ['shatterspleen', 'molten', 'spark', 'gesture', 'tonic'],
        },
        eclipse: {
          hint: 'Mobile turrets become better in Eclipse since Fungus is nerfed. Walking turrets draw aggro — stack damage + personal defense.',
          core: [
            'syringe',
            'atg',
            'ukulele',
            'tougher',
            'infusion',
            'topazbrooch',
          ],
          add: ['clover', 'raincoat', 'repulsion', 'stealthkit'],
          luxury: ['icbm', 'shrimp', 'aegis', 'safer', 'knurl'],
        },
        prismatic: {
          hint: 'Mobile turrets follow you through stages. Stack speed + proc chains for fast clear.',
          core: ['syringe', 'atg', 'ukulele', 'shrimp', 'hoof', 'icbm'],
          add: ['glasses', 'drink', 'mocha', 'clover'],
          luxury: [
            'shatterspleen',
            'molten',
            'convergence',
            'berzerker',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo mobile turrets — walking turrets draw aggro while you proc. Topaz for sustain.',
            core: [
              'syringe',
              'atg',
              'ukulele',
              'shrimp',
              'topazbrooch',
              'clover',
            ],
            add: ['glasses', 'tougher', 'icbm', 'wisp'],
            luxury: ['shatterspleen', 'molten', 'spark', 'infusion', 'aegis'],
          },
          eclipse: {
            hint: 'Solo Eclipse mobile turrets — turrets tank hits for you. Stack personal defense heavy.',
            core: [
              'syringe',
              'atg',
              'tougher',
              'topazbrooch',
              'infusion',
              'repulsion',
            ],
            add: ['ukulele', 'raincoat', 'stealthkit', 'safer'],
            luxury: ['aegis', 'clover', 'icbm', 'knurl', 'shrimp'],
          },
          prismatic: {
            hint: 'Solo Prismatic mobile turrets — turrets move with you for constant DPS. Topaz sustain.',
            core: [
              'syringe',
              'atg',
              'ukulele',
              'shrimp',
              'hoof',
              'topazbrooch',
            ],
            add: ['glasses', 'drink', 'mocha', 'icbm'],
            luxury: [
              'clover',
              'convergence',
              'shatterspleen',
              'berzerker',
              'quail',
            ],
          },
        },
      },
      {
        style: 'Shield + Mines',
        role: 'defensive zoner',
        standard: {
          hint: 'Shield generator + Pressure Mines for area denial. Tanky and consistent.',
          core: ['fungus', 'tougher', 'safer', 'nkuhana', 'rack', 'aegis'],
          add: ['fuel', 'lysate', 'atg', 'clover'],
          luxury: ['knurl', 'planula', 'nucleus', 'convergence', 'stoneflux'],
        },
        eclipse: {
          hint: 'Defensive zoning excels in Eclipse — shield blocks damage. Infusion counters HP curse. Aegis converts healing to barrier.',
          core: [
            'fungus',
            'tougher',
            'safer',
            'infusion',
            'repulsion',
            'aegis',
          ],
          add: ['nkuhana', 'rack', 'raincoat', 'topazbrooch'],
          luxury: ['knurl', 'planula', 'clover', 'stoneflux', 'medkit'],
        },
        prismatic: {
          hint: 'Mines insta-kill trash mobs. Convergence + shield = fast safe teleporter events.',
          core: ['fungus', 'tougher', 'nkuhana', 'rack', 'convergence', 'hoof'],
          add: ['atg', 'aegis', 'clover', 'fuel'],
          luxury: ['knurl', 'nucleus', 'planula', 'safer', 'mocha'],
        },
        solo: {
          standard: {
            hint: 'Solo Engi shield is a personal forcefield. Mines + healing = safe zone control.',
            core: ['fungus', 'tougher', 'safer', 'nkuhana', 'rack', 'aegis'],
            add: ['topazbrooch', 'infusion', 'atg', 'clover'],
            luxury: ['knurl', 'planula', 'nucleus', 'convergence', 'stoneflux'],
          },
          eclipse: {
            hint: 'Solo Eclipse shield zoner — the safest Engi build. Stack every defensive layer.',
            core: [
              'fungus',
              'tougher',
              'safer',
              'infusion',
              'repulsion',
              'topazbrooch',
            ],
            add: ['nkuhana', 'rack', 'raincoat', 'aegis'],
            luxury: ['knurl', 'planula', 'clover', 'stoneflux', 'medkit'],
          },
          prismatic: {
            hint: 'Solo Prismatic zoner — shield holds point, mines clear trash fast.',
            core: [
              'fungus',
              'tougher',
              'nkuhana',
              'rack',
              'convergence',
              'topazbrooch',
            ],
            add: ['atg', 'aegis', 'hoof', 'clover'],
            luxury: ['knurl', 'nucleus', 'planula', 'safer', 'mocha'],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  ARTIFICER
   * ================================================================ */
  {
    name: 'Artificer',
    variants: [
      {
        style: 'Ion Surge Burst',
        role: 'ability burst',
        standard: {
          hint: 'Ion Surge for mobility. Band combos + cooldown for repeated burst windows.',
          core: ['crowbar', 'bands', 'bandk', 'backupmag', 'ignition', 'alien'],
          add: ['feather', 'purity', 'glass', 'justice'],
          luxury: [
            'genesisloop',
            'molten',
            'lightflux',
            'gesture',
            'convergence',
          ],
        },
        eclipse: {
          hint: 'Artificer struggles in Eclipse — no innate mobility without Ion Surge. Feather + Stealthkit mandatory for survival.',
          core: [
            'crowbar',
            'bands',
            'bandk',
            'feather',
            'stealthkit',
            'infusion',
          ],
          add: ['backupmag', 'tougher', 'raincoat', 'topazbrooch'],
          luxury: ['alien', 'clover', 'aegis', 'safer', 'repulsion'],
        },
        prismatic: {
          hint: 'Nano-Bomb + bands one-shots bosses. Stack pure opener damage + movement.',
          core: ['crowbar', 'bands', 'bandk', 'backupmag', 'glass', 'hoof'],
          add: ['ignition', 'alien', 'drink', 'mocha'],
          luxury: ['convergence', 'genesisloop', 'molten', 'feather', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Solo Artificer — Ion Surge is your escape. Burst windows must be lethal since you take all aggro between them.',
            core: [
              'crowbar',
              'bands',
              'bandk',
              'backupmag',
              'feather',
              'topazbrooch',
            ],
            add: ['ignition', 'alien', 'tougher', 'stealthkit'],
            luxury: ['genesisloop', 'molten', 'glass', 'aegis', 'infusion'],
          },
          eclipse: {
            hint: 'Solo Eclipse Artificer is one of the hardest combos. Full defense + burst windows. Feather + Stealthkit non-negotiable.',
            core: [
              'feather',
              'stealthkit',
              'tougher',
              'infusion',
              'topazbrooch',
              'safer',
            ],
            add: ['crowbar', 'bands', 'raincoat', 'repulsion'],
            luxury: ['aegis', 'bandk', 'alien', 'backupmag', 'medkit'],
          },
          prismatic: {
            hint: 'Solo Prismatic Artificer — burst bosses, Ion Surge between stages. Topaz sustain.',
            core: ['crowbar', 'bands', 'bandk', 'backupmag', 'glass', 'hoof'],
            add: ['ignition', 'topazbrooch', 'drink', 'mocha'],
            luxury: ['convergence', 'genesisloop', 'feather', 'alien', 'quail'],
          },
        },
      },
      {
        style: 'Flamethrower Sustain',
        role: 'close-range mage',
        standard: {
          hint: 'Flamethrower melts with ignition scaling. Stay close, burn everything.',
          core: [
            'ignition',
            'gasoline',
            'wisp',
            'crystal',
            'backupmag',
            'alien',
          ],
          add: ['tougher', 'safer', 'behemoth', 'clover'],
          luxury: ['molten', 'shatterspleen', 'knurl', 'convergence', 'aegis'],
        },
        eclipse: {
          hint: 'Flamethrower requires being close — dangerous in Eclipse. Layer flat DR and barrier. Ignition still carries damage.',
          core: [
            'ignition',
            'gasoline',
            'crystal',
            'tougher',
            'infusion',
            'topazbrooch',
          ],
          add: ['safer', 'repulsion', 'raincoat', 'stealthkit'],
          luxury: ['aegis', 'wisp', 'behemoth', 'clover', 'knurl'],
        },
        prismatic: {
          hint: 'Flamethrower clears fast at close range. Ignition + gasoline chains for speed.',
          core: [
            'ignition',
            'gasoline',
            'wisp',
            'crystal',
            'hoof',
            'berzerker',
          ],
          add: ['backupmag', 'alien', 'drink', 'mocha'],
          luxury: ['molten', 'behemoth', 'convergence', 'daggerred', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Solo Flamethrower — on-kill ignite chains clear faster solo. Need sustain for close-range.',
            core: [
              'ignition',
              'gasoline',
              'wisp',
              'crystal',
              'topazbrooch',
              'tougher',
            ],
            add: ['backupmag', 'alien', 'safer', 'clover'],
            luxury: ['molten', 'behemoth', 'aegis', 'knurl', 'infusion'],
          },
          eclipse: {
            hint: 'Solo Eclipse Flamethrower — extremely dangerous. Max defense, ignition does the damage work.',
            core: [
              'ignition',
              'crystal',
              'tougher',
              'infusion',
              'topazbrooch',
              'repulsion',
            ],
            add: ['gasoline', 'safer', 'raincoat', 'stealthkit'],
            luxury: ['aegis', 'wisp', 'knurl', 'clover', 'medkit'],
          },
          prismatic: {
            hint: 'Solo Prismatic Flamethrower — burn through stages. Topaz sustain at close range.',
            core: [
              'ignition',
              'gasoline',
              'wisp',
              'crystal',
              'hoof',
              'topazbrooch',
            ],
            add: ['backupmag', 'alien', 'drink', 'berzerker'],
            luxury: ['molten', 'behemoth', 'convergence', 'daggerred', 'mocha'],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  MERCENARY
   * ================================================================ */
  {
    name: 'Mercenary',
    variants: [
      {
        style: 'Slicing Winds',
        role: 'ranged melee hybrid',
        standard: {
          hint: 'Slicing Winds gives safe ranged option. Crit + proc chains.',
          core: ['glasses', 'pred', 'laser', 'syringe', 'atg', 'clover'],
          add: ['scythe', 'watch', 'ukulele', 'feather'],
          luxury: ['shatterspleen', 'behemoth', 'gesture', 'strides', 'tonic'],
        },
        eclipse: {
          hint: 'Slicing Winds range is safer in Eclipse. Scythe crit-heal + barrier cycling. i-frames on Eviscerate for emergency.',
          core: ['glasses', 'pred', 'syringe', 'scythe', 'tougher', 'infusion'],
          add: ['laser', 'topazbrooch', 'raincoat', 'repulsion'],
          luxury: ['atg', 'clover', 'aegis', 'stealthkit', 'safer'],
        },
        prismatic: {
          hint: 'Slicing Winds for safe speed — ranged melee hybrid clears fast without risk.',
          core: ['glasses', 'pred', 'laser', 'syringe', 'hoof', 'atg'],
          add: ['scythe', 'drink', 'mocha', 'quail'],
          luxury: [
            'clover',
            'shatterspleen',
            'convergence',
            'behemoth',
            'berzerker',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Merc Slicing Winds — ranged option keeps you safer. Crit-heal sustain covers solo aggro.',
            core: [
              'glasses',
              'pred',
              'laser',
              'syringe',
              'scythe',
              'topazbrooch',
            ],
            add: ['atg', 'tougher', 'clover', 'feather'],
            luxury: [
              'shatterspleen',
              'behemoth',
              'aegis',
              'ukulele',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Slicing Winds — ranged attacks from safety. Scythe crit-heal is your primary sustain.',
            core: [
              'glasses',
              'pred',
              'scythe',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['syringe', 'raincoat', 'repulsion', 'stealthkit'],
            luxury: ['laser', 'aegis', 'clover', 'safer', 'knurl'],
          },
          prismatic: {
            hint: 'Solo Prismatic Slicing Winds — fast and safe. Scythe sustain + speed.',
            core: [
              'glasses',
              'pred',
              'laser',
              'syringe',
              'hoof',
              'topazbrooch',
            ],
            add: ['scythe', 'drink', 'mocha', 'atg'],
            luxury: [
              'clover',
              'shatterspleen',
              'convergence',
              'behemoth',
              'quail',
            ],
          },
        },
      },
      {
        style: 'Eviscerate Brawler',
        role: 'melee i-frames',
        standard: {
          hint: 'Close-range i-frame spam. Sustain through damage with Scythe + crit.',
          core: ['crystal', 'syringe', 'glasses', 'scythe', 'feather', 'safer'],
          add: ['berzerker', 'watch', 'behemoth', 'after'],
          luxury: [
            'shatterspleen',
            'knurl',
            'transcendence',
            'strides',
            'planula',
          ],
        },
        eclipse: {
          hint: 'Eclipse permanent damage makes i-frames critical. Eviscerate during danger. Scythe heals in between. Transcendence for max shield.',
          core: [
            'crystal',
            'glasses',
            'scythe',
            'safer',
            'tougher',
            'infusion',
          ],
          add: ['syringe', 'topazbrooch', 'raincoat', 'repulsion'],
          luxury: ['transcendence', 'planula', 'aegis', 'knurl', 'stealthkit'],
        },
        prismatic: {
          hint: 'Eviscerate for i-frame bursts. Berzerker on multi-kills for chain clearing.',
          core: [
            'crystal',
            'syringe',
            'glasses',
            'scythe',
            'hoof',
            'berzerker',
          ],
          add: ['feather', 'drink', 'after', 'mocha'],
          luxury: [
            'shatterspleen',
            'behemoth',
            'convergence',
            'strides',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Eviscerate — i-frames are your main defense. Scythe crit-heal between Eviscerates.',
            core: [
              'crystal',
              'syringe',
              'glasses',
              'scythe',
              'feather',
              'topazbrooch',
            ],
            add: ['safer', 'tougher', 'berzerker', 'after'],
            luxury: [
              'shatterspleen',
              'knurl',
              'planula',
              'transcendence',
              'aegis',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Eviscerate — i-frame through everything. Full defensive core with Scythe healing.',
            core: [
              'crystal',
              'glasses',
              'scythe',
              'safer',
              'tougher',
              'infusion',
            ],
            add: ['syringe', 'topazbrooch', 'raincoat', 'repulsion'],
            luxury: [
              'transcendence',
              'planula',
              'aegis',
              'knurl',
              'stealthkit',
            ],
          },
          prismatic: {
            hint: 'Solo Prismatic Eviscerate — i-frame burst with safety net.',
            core: [
              'crystal',
              'syringe',
              'glasses',
              'scythe',
              'hoof',
              'topazbrooch',
            ],
            add: ['berzerker', 'feather', 'drink', 'after'],
            luxury: [
              'shatterspleen',
              'behemoth',
              'convergence',
              'strides',
              'quail',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  REX
   * ================================================================ */
  {
    name: 'REX',
    variants: [
      {
        style: 'Heal Tank',
        role: 'self-sustain AoE',
        standard: {
          hint: "Massive healing → barrier via Aegis. N'kuhana converts overheal to damage.",
          core: ['weeping', 'scythe', 'nkuhana', 'rack', 'aegis', 'clover'],
          add: ['ukulele', 'wisp', 'tougher', 'safer'],
          luxury: ['knurl', 'planula', 'miredurn', 'convergence', 'stoneflux'],
        },
        eclipse: {
          hint: "Eclipse halves healing but Aegis barrier bypasses the restriction. REX is actually Eclipse-strong because barrier = overheal → N'kuhana skulls.",
          core: ['weeping', 'scythe', 'nkuhana', 'rack', 'aegis', 'infusion'],
          add: ['tougher', 'topazbrooch', 'raincoat', 'safer'],
          luxury: ['clover', 'knurl', 'planula', 'repulsion', 'miredurn'],
        },
        prismatic: {
          hint: 'Seed Barrage + healing for safe fast clear. Aegis generates barrier while clearing.',
          core: ['weeping', 'scythe', 'nkuhana', 'wisp', 'hoof', 'gasoline'],
          add: ['rack', 'ukulele', 'drink', 'mocha'],
          luxury: ['aegis', 'clover', 'convergence', 'berzerker', 'daggerred'],
        },
        solo: {
          standard: {
            hint: 'Solo REX Heal Tank is one of the strongest solo builds in the game. Self-sustain + AoE clear + barrier cycling.',
            core: [
              'weeping',
              'scythe',
              'nkuhana',
              'rack',
              'aegis',
              'topazbrooch',
            ],
            add: ['ukulele', 'wisp', 'tougher', 'clover'],
            luxury: ['knurl', 'planula', 'miredurn', 'infusion', 'stoneflux'],
          },
          eclipse: {
            hint: 'Solo Eclipse REX — one of the best survivors for this. Aegis barrier is unaffected by Eclipse healing nerfs.',
            core: ['weeping', 'scythe', 'nkuhana', 'rack', 'aegis', 'infusion'],
            add: ['topazbrooch', 'tougher', 'raincoat', 'safer'],
            luxury: ['clover', 'knurl', 'planula', 'repulsion', 'miredurn'],
          },
          prismatic: {
            hint: 'Solo Prismatic REX — self-sustain lets you rush without worry. Topaz + Scythe cover HP.',
            core: [
              'weeping',
              'scythe',
              'nkuhana',
              'wisp',
              'hoof',
              'topazbrooch',
            ],
            add: ['gasoline', 'rack', 'drink', 'mocha'],
            luxury: [
              'aegis',
              'clover',
              'convergence',
              'berzerker',
              'daggerred',
            ],
          },
        },
      },
      {
        style: 'Aggressive AoE',
        role: 'self-cost control',
        standard: {
          hint: 'Accept self-damage for massive AoE. Seed Barrage + on-kill chains.',
          core: [
            'wisp',
            'ukulele',
            'gasoline',
            'daggerred',
            'scythe',
            'clover',
          ],
          add: ['ignition', 'behemoth', 'safer', 'weeping'],
          luxury: [
            'shatterspleen',
            'tesla',
            'miredurn',
            'convergence',
            'tonic',
          ],
        },
        eclipse: {
          hint: 'Aggressive REX in Eclipse — self-damage is riskier. Scythe crit-heal is mandatory. Safer Spaces blocks big hits.',
          core: ['wisp', 'ukulele', 'scythe', 'safer', 'tougher', 'infusion'],
          add: ['gasoline', 'topazbrooch', 'raincoat', 'weeping'],
          luxury: ['aegis', 'clover', 'daggerred', 'repulsion', 'knurl'],
        },
        prismatic: {
          hint: 'Aggressive AoE clears stages fast. Seed Barrage chains + movement speed.',
          core: [
            'wisp',
            'ukulele',
            'gasoline',
            'daggerred',
            'hoof',
            'berzerker',
          ],
          add: ['scythe', 'ignition', 'drink', 'mocha'],
          luxury: [
            'shatterspleen',
            'tesla',
            'convergence',
            'behemoth',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Aggressive REX — on-kill chains clear faster with all kills yours. Need Scythe to offset self-damage.',
            core: [
              'wisp',
              'ukulele',
              'gasoline',
              'daggerred',
              'scythe',
              'topazbrooch',
            ],
            add: ['ignition', 'tougher', 'clover', 'weeping'],
            luxury: ['shatterspleen', 'tesla', 'miredurn', 'aegis', 'infusion'],
          },
          eclipse: {
            hint: 'Solo Eclipse Aggressive REX — risky but on-kill chains generate barrier fast. Topaz mandatory.',
            core: [
              'wisp',
              'scythe',
              'safer',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['ukulele', 'gasoline', 'raincoat', 'weeping'],
            luxury: ['aegis', 'clover', 'daggerred', 'repulsion', 'knurl'],
          },
          prismatic: {
            hint: 'Solo Prismatic Aggressive REX — chain kill everything fast. Topaz sustain.',
            core: [
              'wisp',
              'ukulele',
              'gasoline',
              'daggerred',
              'hoof',
              'topazbrooch',
            ],
            add: ['scythe', 'berzerker', 'drink', 'mocha'],
            luxury: [
              'shatterspleen',
              'tesla',
              'convergence',
              'behemoth',
              'quail',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  LOADER
   * ================================================================ */
  {
    name: 'Loader',
    variants: [
      {
        style: 'One-Punch',
        role: 'one-shot diver',
        standard: {
          hint: 'Charged Gauntlet one-shots bosses with enough openers. Pure burst.',
          core: ['crowbar', 'crystal', 'rounds', 'bands', 'bandk', 'h3ad'],
          add: ['hoof', 'watch', 'after', 'justice'],
          luxury: [
            'shatterspleen',
            'genesisloop',
            'molten',
            'glass',
            'convergence',
          ],
        },
        eclipse: {
          hint: "Loader's barrier from grapple is UNAFFECTED by Eclipse healing nerfs. She's the strongest Eclipse survivor. Barely needs defensive items.",
          core: ['crowbar', 'crystal', 'rounds', 'bands', 'bandk', 'h3ad'],
          add: ['tougher', 'infusion', 'raincoat', 'watch'],
          luxury: [
            'shatterspleen',
            'genesisloop',
            'justice',
            'glass',
            'repulsion',
          ],
        },
        prismatic: {
          hint: 'One-Punch + Convergence = sub-minute teleporter events. Fastest boss killer in the game.',
          core: ['crowbar', 'crystal', 'rounds', 'bands', 'bandk', 'glass'],
          add: ['h3ad', 'hoof', 'drink', 'watch'],
          luxury: [
            'convergence',
            'shatterspleen',
            'genesisloop',
            'mocha',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Loader One-Punch — grapple barrier covers all your sustain needs. Pure burst.',
            core: ['crowbar', 'crystal', 'rounds', 'bands', 'bandk', 'h3ad'],
            add: ['hoof', 'watch', 'after', 'justice'],
            luxury: [
              'shatterspleen',
              'genesisloop',
              'molten',
              'glass',
              'convergence',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Loader — still the best. Barrier ignores Eclipse nerfs. Barely needs defensive changes.',
            core: ['crowbar', 'crystal', 'rounds', 'bands', 'bandk', 'h3ad'],
            add: ['tougher', 'infusion', 'raincoat', 'watch'],
            luxury: [
              'shatterspleen',
              'genesisloop',
              'justice',
              'glass',
              'repulsion',
            ],
          },
          prismatic: {
            hint: 'Solo Prismatic Loader — fastest boss killer. Grapple barrier sustain while rushing.',
            core: ['crowbar', 'crystal', 'rounds', 'bands', 'bandk', 'glass'],
            add: ['h3ad', 'hoof', 'drink', 'watch'],
            luxury: [
              'convergence',
              'shatterspleen',
              'genesisloop',
              'mocha',
              'quail',
            ],
          },
        },
      },
      {
        style: 'Grapple Mobility',
        role: 'mobile bruiser',
        standard: {
          hint: 'Grapple for permanent barrier. Speed + survivability over raw burst.',
          core: ['hoof', 'mocha', 'feather', 'tougher', 'safer', 'bands'],
          add: ['crystal', 'bandk', 'quail', 'watch'],
          luxury: ['h3ad', 'after', 'knurl', 'transcendence', 'stoneflux'],
        },
        eclipse: {
          hint: 'Grapple mobility Loader in Eclipse — barrier from grapple is untouched. Add minimal defense; play speed.',
          core: ['hoof', 'mocha', 'feather', 'bands', 'tougher', 'infusion'],
          add: ['crystal', 'bandk', 'raincoat', 'safer'],
          luxury: ['h3ad', 'after', 'knurl', 'transcendence', 'repulsion'],
        },
        prismatic: {
          hint: 'Grapple everywhere — fastest traversal in the game. Stack speed and burst.',
          core: ['hoof', 'mocha', 'feather', 'bands', 'bandk', 'drink'],
          add: ['crystal', 'quail', 'watch', 'crowbar'],
          luxury: [
            'h3ad',
            'after',
            'convergence',
            'berzerker',
            'littledisciple',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Grapple Loader — barrier from grapple sustains solo. Speed lets you avoid all aggro.',
            core: ['hoof', 'mocha', 'feather', 'tougher', 'safer', 'bands'],
            add: ['crystal', 'bandk', 'quail', 'watch'],
            luxury: ['h3ad', 'after', 'knurl', 'transcendence', 'stoneflux'],
          },
          eclipse: {
            hint: 'Solo Eclipse Grapple Loader — still trivial. Barrier ignores nerfs. Play normally.',
            core: ['hoof', 'mocha', 'feather', 'bands', 'tougher', 'infusion'],
            add: ['crystal', 'bandk', 'raincoat', 'safer'],
            luxury: ['h3ad', 'after', 'knurl', 'transcendence', 'repulsion'],
          },
          prismatic: {
            hint: 'Solo Prismatic Grapple Loader — swing through stages at max speed.',
            core: ['hoof', 'mocha', 'feather', 'bands', 'bandk', 'drink'],
            add: ['crystal', 'quail', 'watch', 'crowbar'],
            luxury: [
              'h3ad',
              'after',
              'convergence',
              'berzerker',
              'littledisciple',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  ACRID
   * ================================================================ */
  {
    name: 'Acrid',
    variants: [
      {
        style: 'Poison Kite',
        role: 'DoT + clear',
        standard: {
          hint: 'Apply poison to everything, kite, let DoT do the work.',
          core: ['gasoline', 'wisp', 'ukulele', 'safer', 'tougher', 'feather'],
          add: ['ignition', 'clover', 'daggerred', 'behemoth'],
          luxury: [
            'shatterspleen',
            'planula',
            'miredurn',
            'convergence',
            'strides',
          ],
        },
        eclipse: {
          hint: 'Acrid can kite forever — poison variant is the safest Eclipse build. Apply DoT, run away, let it tick.',
          core: [
            'gasoline',
            'wisp',
            'feather',
            'tougher',
            'infusion',
            'stealthkit',
          ],
          add: ['ukulele', 'safer', 'raincoat', 'topazbrooch'],
          luxury: ['planula', 'clover', 'buckler', 'repulsion', 'miredurn'],
        },
        prismatic: {
          hint: 'Epidemic spreads poison to entire teleporter event. Stack speed — poison kills while you move.',
          core: ['gasoline', 'wisp', 'ukulele', 'hoof', 'drink', 'feather'],
          add: ['mocha', 'quail', 'berzerker', 'daggerred'],
          luxury: [
            'shatterspleen',
            'convergence',
            'strides',
            'ignition',
            'clover',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Acrid Poison Kite — kite forever, DoT does the work. On-kill items trigger faster solo.',
            core: [
              'gasoline',
              'wisp',
              'ukulele',
              'topazbrooch',
              'tougher',
              'feather',
            ],
            add: ['safer', 'ignition', 'clover', 'daggerred'],
            luxury: [
              'shatterspleen',
              'planula',
              'miredurn',
              'strides',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Acrid — safest DoT survivor. Kite + poison, run away. Stealthkit for emergencies.',
            core: [
              'gasoline',
              'wisp',
              'feather',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['stealthkit', 'safer', 'raincoat', 'repulsion'],
            luxury: ['planula', 'clover', 'buckler', 'ukulele', 'miredurn'],
          },
          prismatic: {
            hint: 'Solo Prismatic Acrid — poison spreads while you sprint. Topaz for solo sustain.',
            core: [
              'gasoline',
              'wisp',
              'ukulele',
              'hoof',
              'drink',
              'topazbrooch',
            ],
            add: ['feather', 'mocha', 'quail', 'berzerker'],
            luxury: [
              'shatterspleen',
              'convergence',
              'strides',
              'daggerred',
              'clover',
            ],
          },
        },
      },
      {
        style: 'Blight Melee',
        role: 'melee DoT',
        standard: {
          hint: 'Blight stacks with melee attacks. Get close and shred.',
          core: [
            'crystal',
            'syringe',
            'scythe',
            'berzerker',
            'safer',
            'tougher',
          ],
          add: ['feather', 'ignition', 'clover', 'behemoth'],
          luxury: ['shatterspleen', 'knurl', 'planula', 'strides', 'stoneflux'],
        },
        eclipse: {
          hint: 'Blight melee in Eclipse — close range is risky. Scythe crit-heal + max defense.',
          core: [
            'crystal',
            'syringe',
            'scythe',
            'tougher',
            'infusion',
            'safer',
          ],
          add: ['topazbrooch', 'repulsion', 'raincoat', 'stealthkit'],
          luxury: ['knurl', 'planula', 'clover', 'berzerker', 'aegis'],
        },
        prismatic: {
          hint: 'Blight melee for fast clear — berzerker frenzy on multi-kills chains stages fast.',
          core: [
            'crystal',
            'syringe',
            'scythe',
            'berzerker',
            'hoof',
            'ignition',
          ],
          add: ['feather', 'drink', 'mocha', 'behemoth'],
          luxury: ['shatterspleen', 'convergence', 'strides', 'knurl', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Solo Blight Melee — all kills are yours so Berzerker procs constantly. Scythe crit-heal sustain.',
            core: [
              'crystal',
              'syringe',
              'scythe',
              'berzerker',
              'topazbrooch',
              'tougher',
            ],
            add: ['safer', 'ignition', 'clover', 'feather'],
            luxury: [
              'shatterspleen',
              'knurl',
              'planula',
              'strides',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Blight — very risky melee in Eclipse. Max defense. Scythe is your lifeline.',
            core: [
              'crystal',
              'scythe',
              'tougher',
              'infusion',
              'topazbrooch',
              'safer',
            ],
            add: ['syringe', 'repulsion', 'raincoat', 'stealthkit'],
            luxury: ['knurl', 'planula', 'aegis', 'clover', 'berzerker'],
          },
          prismatic: {
            hint: 'Solo Prismatic Blight — multi-kill frenzy chains faster solo. Topaz sustain.',
            core: [
              'crystal',
              'syringe',
              'scythe',
              'berzerker',
              'hoof',
              'topazbrooch',
            ],
            add: ['ignition', 'feather', 'drink', 'mocha'],
            luxury: [
              'shatterspleen',
              'convergence',
              'strides',
              'knurl',
              'quail',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  CAPTAIN
   * ================================================================ */
  {
    name: 'Captain',
    variants: [
      {
        style: 'Drone Commander',
        role: 'drone scaling',
        standard: {
          hint: 'Spare Drone Parts + drones = army. Buy every drone you see.',
          core: ['droneparts', 'atg', 'ukulele', 'squid', 'clover', 'icbm'],
          add: ['syringe', 'glasses', 'fuel', 'warhorn'],
          luxury: ['nucleus', 'empathy', 'spark', 'gesture', 'tonic'],
        },
        eclipse: {
          hint: 'Captain loses Orbital strikes after stage 1 in Eclipse. Drones compensate. Defense is critical — no air strikes to bail you out.',
          core: [
            'droneparts',
            'atg',
            'ukulele',
            'tougher',
            'infusion',
            'topazbrooch',
          ],
          add: ['clover', 'raincoat', 'repulsion', 'stealthkit'],
          luxury: ['icbm', 'squid', 'aegis', 'nucleus', 'empathy'],
        },
        prismatic: {
          hint: 'Drones provide passive DPS while you rush stages. Focus Commander with speed.',
          core: ['droneparts', 'atg', 'ukulele', 'hoof', 'squid', 'icbm'],
          add: ['syringe', 'glasses', 'drink', 'clover'],
          luxury: ['nucleus', 'empathy', 'convergence', 'gesture', 'mocha'],
        },
        solo: {
          standard: {
            hint: 'Solo Captain Drones — drones are your "teammates." Drone Parts makes them scale. Buy every drone.',
            core: [
              'droneparts',
              'atg',
              'ukulele',
              'squid',
              'topazbrooch',
              'clover',
            ],
            add: ['syringe', 'glasses', 'icbm', 'tougher'],
            luxury: ['nucleus', 'empathy', 'spark', 'gesture', 'aegis'],
          },
          eclipse: {
            hint: 'Solo Eclipse Captain — drones are critical since you lose orbitals. They draw aggro and deal damage.',
            core: [
              'droneparts',
              'atg',
              'tougher',
              'topazbrooch',
              'infusion',
              'repulsion',
            ],
            add: ['ukulele', 'clover', 'raincoat', 'stealthkit'],
            luxury: ['icbm', 'squid', 'aegis', 'nucleus', 'empathy'],
          },
          prismatic: {
            hint: 'Solo Prismatic Captain — drones do passive DPS while you rush. Buy every drone.',
            core: [
              'droneparts',
              'atg',
              'ukulele',
              'hoof',
              'squid',
              'topazbrooch',
            ],
            add: ['syringe', 'icbm', 'drink', 'clover'],
            luxury: ['nucleus', 'empathy', 'convergence', 'gesture', 'mocha'],
          },
        },
      },
      {
        style: 'Shotgun Proc',
        role: 'all-rounder',
        standard: {
          hint: 'Vulcan Shotgun hits 8 pellets — proc chains go crazy.',
          core: ['syringe', 'atg', 'ukulele', 'rounds', 'clover', 'icbm'],
          add: ['glasses', 'justice', 'feather', 'watch'],
          luxury: [
            'shatterspleen',
            'molten',
            'spark',
            'gesture',
            'convergence',
          ],
        },
        eclipse: {
          hint: 'Shotgun proc chains still work in Eclipse. Layer defense — no Orbital safety net.',
          core: [
            'syringe',
            'atg',
            'ukulele',
            'tougher',
            'infusion',
            'topazbrooch',
          ],
          add: ['rounds', 'raincoat', 'repulsion', 'stealthkit'],
          luxury: ['clover', 'icbm', 'aegis', 'justice', 'safer'],
        },
        prismatic: {
          hint: 'Shotgun proc chains + speed. Delete teleporter events fast.',
          core: ['syringe', 'atg', 'ukulele', 'rounds', 'hoof', 'icbm'],
          add: ['glasses', 'drink', 'clover', 'crowbar'],
          luxury: ['shatterspleen', 'molten', 'convergence', 'spark', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Solo Captain Shotgun — 8 pellets × proc chains is insane solo. Topaz on every kill wave.',
            core: [
              'syringe',
              'atg',
              'ukulele',
              'rounds',
              'topazbrooch',
              'clover',
            ],
            add: ['glasses', 'justice', 'icbm', 'tougher'],
            luxury: ['shatterspleen', 'molten', 'spark', 'aegis', 'infusion'],
          },
          eclipse: {
            hint: 'Solo Eclipse Captain Shotgun — proc chains + max defense. No orbitals to save you.',
            core: [
              'syringe',
              'atg',
              'tougher',
              'topazbrooch',
              'infusion',
              'repulsion',
            ],
            add: ['ukulele', 'rounds', 'raincoat', 'stealthkit'],
            luxury: ['clover', 'icbm', 'aegis', 'justice', 'safer'],
          },
          prismatic: {
            hint: 'Solo Prismatic Captain Shotgun — proc chain rush with Topaz safety.',
            core: [
              'syringe',
              'atg',
              'ukulele',
              'rounds',
              'hoof',
              'topazbrooch',
            ],
            add: ['glasses', 'drink', 'icbm', 'crowbar'],
            luxury: [
              'clover',
              'convergence',
              'shatterspleen',
              'molten',
              'quail',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  RAILGUNNER
   * ================================================================ */
  {
    name: 'Railgunner',
    variants: [
      {
        style: 'Supercharge Sniper',
        role: 'precision burst',
        standard: {
          hint: 'Supercharge for massive single-target. Bands proc off the big hit.',
          core: ['crowbar', 'rounds', 'bands', 'bandk', 'laser', 'justice'],
          add: ['feather', 'watch', 'clover', 'crystal'],
          luxury: ['shatterspleen', 'molten', 'glass', 'convergence', 'crown'],
        },
        eclipse: {
          hint: 'Railgunner is the squishiest survivor. Eclipse permanent damage = death without escape tools. Stealthkit + Feather mandatory.',
          core: [
            'crowbar',
            'rounds',
            'bands',
            'feather',
            'stealthkit',
            'infusion',
          ],
          add: ['bandk', 'tougher', 'raincoat', 'safer'],
          luxury: ['laser', 'clover', 'aegis', 'repulsion', 'topazbrooch'],
        },
        prismatic: {
          hint: 'One-shot bosses from across the map. Pure opener stacking + movement.',
          core: ['crowbar', 'rounds', 'bands', 'bandk', 'glass', 'hoof'],
          add: ['laser', 'watch', 'drink', 'mocha'],
          luxury: ['clover', 'convergence', 'shatterspleen', 'h3ad', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Solo Railgunner — one-shot threats before they reach you. Feather + Stealthkit since all aggro is yours.',
            core: ['crowbar', 'rounds', 'bands', 'bandk', 'laser', 'feather'],
            add: ['stealthkit', 'tougher', 'clover', 'topazbrooch'],
            luxury: ['shatterspleen', 'molten', 'glass', 'justice', 'infusion'],
          },
          eclipse: {
            hint: 'Solo Eclipse Railgunner — brutal. Must one-shot everything or die. Full escape kit.',
            core: [
              'feather',
              'stealthkit',
              'tougher',
              'infusion',
              'safer',
              'topazbrooch',
            ],
            add: ['crowbar', 'rounds', 'bands', 'raincoat'],
            luxury: ['aegis', 'bandk', 'clover', 'repulsion', 'medkit'],
          },
          prismatic: {
            hint: 'Solo Prismatic Railgunner — one-shot bosses from range; Topaz covers solo sustain.',
            core: ['crowbar', 'rounds', 'bands', 'bandk', 'glass', 'hoof'],
            add: ['laser', 'topazbrooch', 'drink', 'mocha'],
            luxury: [
              'clover',
              'convergence',
              'shatterspleen',
              'feather',
              'quail',
            ],
          },
        },
      },
      {
        style: 'Cryocharge',
        role: 'freeze utility',
        standard: {
          hint: 'Cryocharge freezes on weakpoint. Crowd control + burst hybrid.',
          core: ['crowbar', 'rounds', 'backupmag', 'bands', 'bandk', 'alien'],
          add: ['laser', 'justice', 'clover', 'feather'],
          luxury: [
            'shatterspleen',
            'glass',
            'lightflux',
            'convergence',
            'purity',
          ],
        },
        eclipse: {
          hint: 'Cryocharge freeze gives breathing room in Eclipse. Frozen enemies = safe damage windows.',
          core: [
            'crowbar',
            'rounds',
            'backupmag',
            'bands',
            'feather',
            'infusion',
          ],
          add: ['alien', 'tougher', 'raincoat', 'stealthkit'],
          luxury: ['clover', 'justice', 'aegis', 'safer', 'topazbrooch'],
        },
        prismatic: {
          hint: 'Freeze teleporter event enemies while bursting the boss. Fast and safe.',
          core: ['crowbar', 'rounds', 'backupmag', 'bands', 'bandk', 'hoof'],
          add: ['alien', 'glass', 'drink', 'mocha'],
          luxury: [
            'convergence',
            'clover',
            'shatterspleen',
            'lightflux',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Cryocharge — freeze threats while you reload. Great crowd control for solo.',
            core: [
              'crowbar',
              'rounds',
              'backupmag',
              'bands',
              'bandk',
              'feather',
            ],
            add: ['alien', 'tougher', 'clover', 'topazbrooch'],
            luxury: [
              'shatterspleen',
              'glass',
              'lightflux',
              'justice',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Cryocharge — freeze for safe windows. Max escape tools.',
            core: [
              'crowbar',
              'backupmag',
              'feather',
              'stealthkit',
              'infusion',
              'tougher',
            ],
            add: ['rounds', 'bands', 'raincoat', 'topazbrooch'],
            luxury: ['alien', 'clover', 'aegis', 'safer', 'repulsion'],
          },
          prismatic: {
            hint: 'Solo Prismatic Cryocharge — freeze + burst for safe speed. Topaz sustain.',
            core: ['crowbar', 'rounds', 'backupmag', 'bands', 'bandk', 'hoof'],
            add: ['alien', 'topazbrooch', 'drink', 'mocha'],
            luxury: ['convergence', 'clover', 'glass', 'lightflux', 'quail'],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  VOID FIEND
   * ================================================================ */
  {
    name: 'Void Fiend',
    variants: [
      {
        style: 'Void Corruption',
        role: 'form shifter',
        standard: {
          hint: 'Embrace corruption windows. Void items accelerate corruption for more DPS uptime.',
          core: ['syringe', 'shrimp', 'polylute', 'safer', 'lysate', 'clover'],
          add: ['atg', 'watch', 'hook', 'behemoth'],
          luxury: [
            'genesisloop',
            'planula',
            'transcendence',
            'egocentrism',
            'tonic',
          ],
        },
        eclipse: {
          hint: 'Corruption form is risky in Eclipse — you take more damage. Suppress Control is generally safer. If running Corruption, stack void items + defense.',
          core: [
            'syringe',
            'shrimp',
            'polylute',
            'safer',
            'infusion',
            'tougher',
          ],
          add: ['lysate', 'raincoat', 'topazbrooch', 'stealthkit'],
          luxury: ['clover', 'aegis', 'repulsion', 'planula', 'transcendence'],
        },
        prismatic: {
          hint: 'Corruption build for raw speed. Full void items for fast form swaps — massive DPS windows.',
          core: [
            'syringe',
            'shrimp',
            'polylute',
            'lysate',
            'hoof',
            'needletick',
          ],
          add: ['voidsent', 'drink', 'mocha', 'clover'],
          luxury: [
            'convergence',
            'genesisloop',
            'egocentrism',
            'behemoth',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Void Corruption — corruption DPS windows shred when you get all kills. Safer Spaces for burst protection.',
            core: [
              'syringe',
              'shrimp',
              'polylute',
              'safer',
              'lysate',
              'topazbrooch',
            ],
            add: ['atg', 'tougher', 'clover', 'hook'],
            luxury: [
              'genesisloop',
              'planula',
              'transcendence',
              'egocentrism',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Void Corruption — risky form shifts with no backup. Max defense for corruption windows.',
            core: [
              'syringe',
              'shrimp',
              'safer',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['polylute', 'lysate', 'raincoat', 'stealthkit'],
            luxury: [
              'clover',
              'aegis',
              'repulsion',
              'planula',
              'transcendence',
            ],
          },
          prismatic: {
            hint: 'Solo Prismatic Void Corruption — corruption DPS + speed. Topaz sustain between forms.',
            core: [
              'syringe',
              'shrimp',
              'polylute',
              'lysate',
              'hoof',
              'topazbrooch',
            ],
            add: ['needletick', 'voidsent', 'drink', 'mocha'],
            luxury: [
              'convergence',
              'clover',
              'genesisloop',
              'egocentrism',
              'quail',
            ],
          },
        },
      },
      {
        style: 'Suppress Control',
        role: 'sustained safe',
        standard: {
          hint: 'Stay in base form. Use Suppress to heal and control corruption.',
          core: ['syringe', 'glasses', 'atg', 'ukulele', 'tougher', 'clover'],
          add: ['scythe', 'pred', 'icbm', 'safer'],
          luxury: ['shatterspleen', 'aegis', 'raincoat', 'tonic', 'knurl'],
        },
        eclipse: {
          hint: 'Suppress Control is the safer Eclipse build for Void Fiend. Suppress heals, barrier blocks Eclipse damage.',
          core: ['syringe', 'glasses', 'atg', 'tougher', 'infusion', 'scythe'],
          add: ['ukulele', 'raincoat', 'topazbrooch', 'safer'],
          luxury: ['clover', 'aegis', 'repulsion', 'knurl', 'stealthkit'],
        },
        prismatic: {
          hint: 'Suppress Control for safe Prismatic — consistent damage without corruption risk.',
          core: ['syringe', 'glasses', 'atg', 'ukulele', 'hoof', 'icbm'],
          add: ['scythe', 'drink', 'mocha', 'clover'],
          luxury: [
            'shatterspleen',
            'convergence',
            'berzerker',
            'pred',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Suppress Control — safe and consistent. Suppress heals when you need it. Topaz barrier cycling.',
            core: [
              'syringe',
              'glasses',
              'atg',
              'ukulele',
              'topazbrooch',
              'tougher',
            ],
            add: ['scythe', 'clover', 'icbm', 'safer'],
            luxury: ['shatterspleen', 'aegis', 'raincoat', 'knurl', 'infusion'],
          },
          eclipse: {
            hint: 'Solo Eclipse Suppress Control — safest Void Fiend build. Suppress heal + barrier cycling.',
            core: [
              'syringe',
              'glasses',
              'tougher',
              'infusion',
              'topazbrooch',
              'scythe',
            ],
            add: ['atg', 'raincoat', 'safer', 'stealthkit'],
            luxury: ['aegis', 'clover', 'ukulele', 'knurl', 'repulsion'],
          },
          prismatic: {
            hint: 'Solo Prismatic Suppress — safe speed with Topaz sustain.',
            core: [
              'syringe',
              'glasses',
              'atg',
              'ukulele',
              'hoof',
              'topazbrooch',
            ],
            add: ['scythe', 'drink', 'mocha', 'icbm'],
            luxury: [
              'clover',
              'convergence',
              'shatterspleen',
              'berzerker',
              'quail',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  SEEKER
   * ================================================================ */
  {
    name: 'Seeker',
    variants: [
      {
        style: 'Ability Spam',
        role: 'hybrid skirmisher',
        standard: {
          hint: 'Ability-heavy style: cooldown + mobility + burst windows.',
          core: ['backupmag', 'feather', 'bands', 'bandk', 'alien', 'safer'],
          add: ['watch', 'tougher', 'clover', 'after'],
          luxury: [
            'planula',
            'shatterspleen',
            'lightflux',
            'strides',
            'convergence',
          ],
        },
        eclipse: {
          hint: 'Seeker ability spam in Eclipse — cooldown cycling keeps you safe. Defensive layers between bursts.',
          core: [
            'backupmag',
            'feather',
            'alien',
            'tougher',
            'infusion',
            'safer',
          ],
          add: ['bands', 'bandk', 'raincoat', 'topazbrooch'],
          luxury: ['after', 'clover', 'aegis', 'stealthkit', 'repulsion'],
        },
        prismatic: {
          hint: 'Ability spam for fast clear. Bands burst + movement speed.',
          core: ['backupmag', 'bands', 'bandk', 'alien', 'hoof', 'feather'],
          add: ['watch', 'drink', 'mocha', 'after'],
          luxury: ['convergence', 'clover', 'lightflux', 'strides', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Solo Seeker Ability Spam — cooldown cycling between abilities. Topaz sustain between bursts.',
            core: [
              'backupmag',
              'feather',
              'bands',
              'bandk',
              'alien',
              'topazbrooch',
            ],
            add: ['safer', 'tougher', 'clover', 'after'],
            luxury: [
              'planula',
              'shatterspleen',
              'lightflux',
              'strides',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Seeker Abilities — defensive spam. Max defense between ability windows.',
            core: [
              'backupmag',
              'feather',
              'alien',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['safer', 'raincoat', 'stealthkit', 'repulsion'],
            luxury: ['bands', 'bandk', 'aegis', 'clover', 'after'],
          },
          prismatic: {
            hint: 'Solo Prismatic Seeker — ability burst + speed with Topaz safety.',
            core: [
              'backupmag',
              'bands',
              'bandk',
              'alien',
              'hoof',
              'topazbrooch',
            ],
            add: ['feather', 'drink', 'mocha', 'after'],
            luxury: ['convergence', 'clover', 'lightflux', 'strides', 'quail'],
          },
        },
      },
      {
        style: 'Sojourn Sustain',
        role: 'sustain fighter',
        standard: {
          hint: 'Sojourn heals scale with damage dealt. Build damage to heal.',
          core: ['syringe', 'glasses', 'atg', 'scythe', 'ukulele', 'clover'],
          add: ['pred', 'safer', 'feather', 'watch'],
          luxury: ['aegis', 'rack', 'shatterspleen', 'tonic', 'convergence'],
        },
        eclipse: {
          hint: 'Sojourn sustain is Eclipse-strong — damage dealt = healing. Aegis converts overheal to barrier.',
          core: ['syringe', 'glasses', 'atg', 'scythe', 'tougher', 'infusion'],
          add: ['ukulele', 'topazbrooch', 'raincoat', 'safer'],
          luxury: ['aegis', 'rack', 'clover', 'repulsion', 'stealthkit'],
        },
        prismatic: {
          hint: 'Sojourn sustain + speed — damage heals you while rushing.',
          core: ['syringe', 'glasses', 'atg', 'scythe', 'hoof', 'ukulele'],
          add: ['pred', 'drink', 'mocha', 'clover'],
          luxury: [
            'aegis',
            'convergence',
            'shatterspleen',
            'berzerker',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Sojourn Sustain — all damage is yours so healing scales faster. Strong solo survivor.',
            core: [
              'syringe',
              'glasses',
              'atg',
              'scythe',
              'topazbrooch',
              'ukulele',
            ],
            add: ['pred', 'tougher', 'clover', 'safer'],
            luxury: ['aegis', 'rack', 'shatterspleen', 'infusion', 'knurl'],
          },
          eclipse: {
            hint: 'Solo Eclipse Sojourn — damage-based healing is Eclipse-strong solo. Aegis barrier bypasses healing nerfs.',
            core: [
              'syringe',
              'glasses',
              'atg',
              'scythe',
              'tougher',
              'infusion',
            ],
            add: ['topazbrooch', 'raincoat', 'safer', 'repulsion'],
            luxury: ['aegis', 'rack', 'clover', 'ukulele', 'stealthkit'],
          },
          prismatic: {
            hint: 'Solo Prismatic Sojourn — deal damage = heal while rushing. Topaz for backup.',
            core: [
              'syringe',
              'glasses',
              'atg',
              'scythe',
              'hoof',
              'topazbrooch',
            ],
            add: ['ukulele', 'drink', 'mocha', 'clover'],
            luxury: [
              'aegis',
              'convergence',
              'shatterspleen',
              'berzerker',
              'quail',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  FALSE SON
   * ================================================================ */
  {
    name: 'False Son',
    variants: [
      {
        style: 'Tank Brawler',
        role: 'frontline bruiser',
        standard: {
          hint: 'Tanky pressure with close-mid range damage spikes.',
          core: ['crystal', 'tougher', 'safer', 'syringe', 'justice', 'scythe'],
          add: ['behemoth', 'spark', 'feather', 'watch'],
          luxury: ['knurl', 'planula', 'molten', 'transcendence', 'stoneflux'],
        },
        eclipse: {
          hint: "False Son's high base HP makes armor plates very efficient in Eclipse. Tank through with barrier.",
          core: [
            'crystal',
            'tougher',
            'safer',
            'infusion',
            'repulsion',
            'scythe',
          ],
          add: ['syringe', 'topazbrooch', 'raincoat', 'justice'],
          luxury: ['aegis', 'knurl', 'planula', 'stoneflux', 'stealthkit'],
        },
        prismatic: {
          hint: 'Tank Brawler with speed — stand on teleporter, clear fast.',
          core: [
            'crystal',
            'syringe',
            'justice',
            'scythe',
            'hoof',
            'berzerker',
          ],
          add: ['behemoth', 'drink', 'mocha', 'tougher'],
          luxury: ['convergence', 'knurl', 'molten', 'spark', 'quail'],
        },
        solo: {
          standard: {
            hint: 'Solo False Son Tank — high base HP makes you naturally tanky. On-kill barrier from Topaz patches sustain.',
            core: [
              'crystal',
              'tougher',
              'safer',
              'syringe',
              'scythe',
              'topazbrooch',
            ],
            add: ['justice', 'behemoth', 'feather', 'infusion'],
            luxury: [
              'knurl',
              'planula',
              'molten',
              'transcendence',
              'stoneflux',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse False Son — one of the better Eclipse solo picks. High HP + armor plates + barrier.',
            core: [
              'crystal',
              'tougher',
              'safer',
              'infusion',
              'repulsion',
              'topazbrooch',
            ],
            add: ['scythe', 'raincoat', 'syringe', 'justice'],
            luxury: ['aegis', 'knurl', 'planula', 'stoneflux', 'stealthkit'],
          },
          prismatic: {
            hint: 'Solo Prismatic Tank Brawler — tank teleporter solo. Topaz for sustain.',
            core: [
              'crystal',
              'syringe',
              'justice',
              'scythe',
              'hoof',
              'topazbrooch',
            ],
            add: ['berzerker', 'drink', 'mocha', 'tougher'],
            luxury: ['convergence', 'knurl', 'molten', 'spark', 'quail'],
          },
        },
      },
      {
        style: 'Lunar Synergy',
        role: 'lunar bruiser',
        standard: {
          hint: 'False Son benefits from Lunar items more than most. Lean into the curse.',
          core: [
            'crystal',
            'justice',
            'scythe',
            'glass',
            'stoneflux',
            'transcendence',
          ],
          add: ['tougher', 'syringe', 'behemoth', 'egocentrism'],
          luxury: ['knurl', 'planula', 'lightflux', 'gesture', 'purity'],
        },
        eclipse: {
          hint: 'Lunar builds in Eclipse are risky — Glass halves HP on top of the curse. Transcendence shields help but regenerate slowly.',
          core: [
            'crystal',
            'justice',
            'scythe',
            'stoneflux',
            'transcendence',
            'infusion',
          ],
          add: ['tougher', 'raincoat', 'repulsion', 'topazbrooch'],
          luxury: ['aegis', 'knurl', 'planula', 'egocentrism', 'safer'],
        },
        prismatic: {
          hint: 'Lunar Synergy + speed — Glass for burst damage, rush stages.',
          core: ['crystal', 'justice', 'glass', 'stoneflux', 'hoof', 'scythe'],
          add: ['transcendence', 'egocentrism', 'drink', 'mocha'],
          luxury: ['convergence', 'knurl', 'lightflux', 'gesture', 'purity'],
        },
        solo: {
          standard: {
            hint: 'Solo Lunar False Son — Glass is riskier solo but curse stacking is powerful. Scythe crit-heal sustain.',
            core: [
              'crystal',
              'justice',
              'scythe',
              'glass',
              'stoneflux',
              'tougher',
            ],
            add: ['transcendence', 'syringe', 'behemoth', 'egocentrism'],
            luxury: [
              'knurl',
              'planula',
              'lightflux',
              'topazbrooch',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Lunar False Son — avoid Glass (too risky). Transcendence shields + Stone Flux HP.',
            core: [
              'crystal',
              'justice',
              'scythe',
              'stoneflux',
              'transcendence',
              'infusion',
            ],
            add: ['tougher', 'topazbrooch', 'raincoat', 'repulsion'],
            luxury: ['aegis', 'knurl', 'planula', 'egocentrism', 'safer'],
          },
          prismatic: {
            hint: 'Solo Prismatic Lunar — Glass for burst, Topaz for solo sustain.',
            core: [
              'crystal',
              'justice',
              'glass',
              'stoneflux',
              'hoof',
              'topazbrooch',
            ],
            add: ['scythe', 'transcendence', 'drink', 'mocha'],
            luxury: [
              'convergence',
              'knurl',
              'lightflux',
              'egocentrism',
              'purity',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  CHEF
   * ================================================================ */
  {
    name: 'CHEF',
    variants: [
      {
        style: 'Ignite AoE',
        role: 'close-range control',
        standard: {
          hint: 'Excels with ignite/aoe and survivability while brawling.',
          core: [
            'ignition',
            'gasoline',
            'wisp',
            'crystal',
            'tougher',
            'feather',
          ],
          add: ['syringe', 'behemoth', 'daggerred', 'clover'],
          luxury: [
            'molten',
            'shatterspleen',
            'knurl',
            'miredurn',
            'convergence',
          ],
        },
        eclipse: {
          hint: "CHEF needs to brawl close — Eclipse punishes that. Stealthkit escapes bad trades. Flat DR stacks well with CHEF's kit.",
          core: [
            'ignition',
            'gasoline',
            'crystal',
            'tougher',
            'infusion',
            'stealthkit',
          ],
          add: ['wisp', 'topazbrooch', 'raincoat', 'repulsion'],
          luxury: ['aegis', 'buckler', 'clover', 'behemoth', 'knurl'],
        },
        prismatic: {
          hint: 'Ignite AoE clears stages fast. Stack speed + ignite chains for rapid clear.',
          core: [
            'ignition',
            'gasoline',
            'wisp',
            'crystal',
            'hoof',
            'berzerker',
          ],
          add: ['syringe', 'drink', 'mocha', 'daggerred'],
          luxury: [
            'molten',
            'shatterspleen',
            'convergence',
            'behemoth',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo CHEF Ignite — on-kill chains clear faster solo. Topaz barrier sustain while brawling.',
            core: [
              'ignition',
              'gasoline',
              'wisp',
              'crystal',
              'topazbrooch',
              'tougher',
            ],
            add: ['syringe', 'behemoth', 'daggerred', 'clover'],
            luxury: [
              'molten',
              'shatterspleen',
              'knurl',
              'miredurn',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse CHEF — brawling alone in Eclipse is dangerous. Max defense, ignite does the work.',
            core: [
              'ignition',
              'gasoline',
              'crystal',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['stealthkit', 'raincoat', 'repulsion', 'safer'],
            luxury: ['aegis', 'buckler', 'clover', 'knurl', 'wisp'],
          },
          prismatic: {
            hint: 'Solo Prismatic CHEF — ignite chain clears. Topaz for solo sustain.',
            core: [
              'ignition',
              'gasoline',
              'wisp',
              'crystal',
              'hoof',
              'topazbrooch',
            ],
            add: ['syringe', 'drink', 'berzerker', 'daggerred'],
            luxury: [
              'molten',
              'shatterspleen',
              'convergence',
              'behemoth',
              'quail',
            ],
          },
        },
      },
      {
        style: 'Glaze Kite',
        role: 'ranged control',
        standard: {
          hint: 'Glaze at range, kite enemies through oil. Safer playstyle.',
          core: ['ignition', 'hoof', 'mocha', 'ukulele', 'tougher', 'feather'],
          add: ['wisp', 'gasoline', 'clover', 'safer'],
          luxury: [
            'behemoth',
            'tesla',
            'littledisciple',
            'strides',
            'convergence',
          ],
        },
        eclipse: {
          hint: 'Glaze Kite is the safer CHEF Eclipse build — ranged control. Stack speed to stay away.',
          core: ['ignition', 'hoof', 'mocha', 'tougher', 'infusion', 'feather'],
          add: ['ukulele', 'safer', 'raincoat', 'stealthkit'],
          luxury: ['buckler', 'clover', 'aegis', 'topazbrooch', 'repulsion'],
        },
        prismatic: {
          hint: 'Glaze Kite + max speed — oil trails + ignite while sprinting through stages.',
          core: ['ignition', 'hoof', 'mocha', 'ukulele', 'drink', 'feather'],
          add: ['wisp', 'gasoline', 'quail', 'berzerker'],
          luxury: [
            'littledisciple',
            'tesla',
            'convergence',
            'strides',
            'behemoth',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Glaze Kite — ranged control is strong solo. Kite while ignite ticks. Topaz sustain.',
            core: [
              'ignition',
              'hoof',
              'mocha',
              'ukulele',
              'topazbrooch',
              'feather',
            ],
            add: ['wisp', 'gasoline', 'tougher', 'clover'],
            luxury: [
              'behemoth',
              'tesla',
              'littledisciple',
              'strides',
              'infusion',
            ],
          },
          eclipse: {
            hint: 'Solo Eclipse Glaze Kite — safest CHEF build. Range + speed keeps you alive.',
            core: [
              'ignition',
              'hoof',
              'mocha',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['feather', 'safer', 'raincoat', 'stealthkit'],
            luxury: ['buckler', 'clover', 'aegis', 'ukulele', 'repulsion'],
          },
          prismatic: {
            hint: 'Solo Prismatic Glaze — sprint + ignite. Topaz sustain while kiting.',
            core: [
              'ignition',
              'hoof',
              'mocha',
              'ukulele',
              'drink',
              'topazbrooch',
            ],
            add: ['feather', 'wisp', 'quail', 'gasoline'],
            luxury: [
              'littledisciple',
              'tesla',
              'convergence',
              'strides',
              'berzerker',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  OPERATOR
   * ================================================================ */
  {
    name: 'Operator',
    variants: [
      {
        style: 'Rapid Fire',
        role: 'ranged sustained',
        standard: {
          hint: 'Lean into rapid-hit proc chains and movement uptime.',
          core: ['syringe', 'glasses', 'atg', 'ukulele', 'shrimp', 'clover'],
          add: ['pred', 'scythe', 'icbm', 'safer'],
          luxury: ['shatterspleen', 'spark', 'gesture', 'tonic', 'crown'],
        },
        eclipse: {
          hint: 'Ranged playstyle is Eclipse-friendly — you can kite. Layer defense into the proc chain.',
          core: ['syringe', 'glasses', 'atg', 'ukulele', 'tougher', 'infusion'],
          add: ['scythe', 'raincoat', 'topazbrooch', 'stealthkit'],
          luxury: ['clover', 'icbm', 'aegis', 'safer', 'repulsion'],
        },
        prismatic: {
          hint: 'Proc chains for speed. Rapid fire + movement sweep stages.',
          core: ['syringe', 'glasses', 'atg', 'ukulele', 'hoof', 'shrimp'],
          add: ['drink', 'mocha', 'icbm', 'clover'],
          luxury: [
            'shatterspleen',
            'convergence',
            'spark',
            'berzerker',
            'quail',
          ],
        },
        solo: {
          standard: {
            hint: 'Solo Operator — ranged proc chains scale great solo. All kills = faster on-kill items.',
            core: [
              'syringe',
              'glasses',
              'atg',
              'ukulele',
              'topazbrooch',
              'scythe',
            ],
            add: ['pred', 'tougher', 'clover', 'icbm'],
            luxury: ['shatterspleen', 'spark', 'shrimp', 'aegis', 'infusion'],
          },
          eclipse: {
            hint: 'Solo Eclipse Operator — ranged kiting is safe. Layer defense + proc chains.',
            core: [
              'syringe',
              'glasses',
              'atg',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['ukulele', 'scythe', 'raincoat', 'stealthkit'],
            luxury: ['clover', 'icbm', 'aegis', 'safer', 'repulsion'],
          },
          prismatic: {
            hint: 'Solo Prismatic Operator — ranged proc rush. Topaz for solo sustain.',
            core: [
              'syringe',
              'glasses',
              'atg',
              'ukulele',
              'hoof',
              'topazbrooch',
            ],
            add: ['drink', 'mocha', 'icbm', 'shrimp'],
            luxury: [
              'clover',
              'convergence',
              'shatterspleen',
              'berzerker',
              'quail',
            ],
          },
        },
      },
    ],
  },

  /* ================================================================
   *  DRIFTER
   * ================================================================ */
  {
    name: 'Drifter',
    variants: [
      {
        style: 'Universal',
        role: 'utility striker',
        standard: {
          hint: 'Flexible kit: prioritize universal damage + safety.',
          core: ['watch', 'feather', 'atg', 'ukulele', 'tougher', 'safer'],
          add: ['wisp', 'justice', 'clover', 'hook'],
          luxury: ['knurl', 'planula', 'nucleus', 'convergence', 'strides'],
        },
        eclipse: {
          hint: 'Drifter is flexible enough for Eclipse. Stack defensive layers and let proc chains do damage.',
          core: ['watch', 'feather', 'atg', 'tougher', 'infusion', 'safer'],
          add: ['ukulele', 'raincoat', 'topazbrooch', 'stealthkit'],
          luxury: ['clover', 'aegis', 'repulsion', 'knurl', 'planula'],
        },
        prismatic: {
          hint: 'Universal build + movement. Drifter is a solid all-around Prismatic pick.',
          core: ['watch', 'feather', 'atg', 'ukulele', 'hoof', 'drink'],
          add: ['wisp', 'mocha', 'quail', 'berzerker'],
          luxury: ['convergence', 'clover', 'strides', 'nucleus', 'daggerred'],
        },
        solo: {
          standard: {
            hint: 'Solo Drifter Universal — flexible kit handles all situations. Topaz on-kill barrier for solo sustain.',
            core: [
              'watch',
              'feather',
              'atg',
              'ukulele',
              'topazbrooch',
              'tougher',
            ],
            add: ['wisp', 'safer', 'clover', 'justice'],
            luxury: ['knurl', 'planula', 'nucleus', 'strides', 'infusion'],
          },
          eclipse: {
            hint: 'Solo Eclipse Drifter — flexible enough to survive. Stack every defensive layer.',
            core: [
              'watch',
              'feather',
              'atg',
              'tougher',
              'infusion',
              'topazbrooch',
            ],
            add: ['safer', 'raincoat', 'stealthkit', 'repulsion'],
            luxury: ['aegis', 'clover', 'ukulele', 'knurl', 'planula'],
          },
          prismatic: {
            hint: 'Solo Prismatic Drifter — flexible speed build. Topaz sustain.',
            core: ['watch', 'feather', 'atg', 'ukulele', 'hoof', 'topazbrooch'],
            add: ['drink', 'mocha', 'quail', 'wisp'],
            luxury: [
              'convergence',
              'clover',
              'strides',
              'berzerker',
              'daggerred',
            ],
          },
        },
      },
    ],
  },
];
