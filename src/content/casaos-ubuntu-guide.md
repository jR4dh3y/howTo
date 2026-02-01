# The No-BS Guide to Building Your First Home Server with Ubuntu and CasaOS

So you have got an old laptop gathering dust in a drawer, or maybe a spare mini PC sitting in the closet. Instead of letting it rot, let us turn it into something actually useful - a home server that runs your own AI assistant, caches your Steam downloads, manages your passwords privately, and gives you a private cloud that Big Tech cannot snoop on.

This guide walks you through the entire setup using **Ubuntu Server** and **CasaOS**.

---

## What We Are Building

A personal cloud server running on hardware you already own. Once it is done, you will have:

- Your own media server (movies, music, photos)
- Your own AI assistant (free, powered by OpenRouter or if u have beefy hardware, fully local)
- Steam game caching (download updates once, play everywhere and remote download)
- A private password manager (1Password alternative, fully yours)
- Network-wide ad blocking (Pi-hole)
- A file server you control (not Google Drive)
- One-click app installation via CasaOS
- Remote access to everything from your phone

The magic combo is **Ubuntu Server** (lightweight, no GUI) + **CasaOS** (beautiful web interface that hides all the Docker complexity).

---

## Hardware Requirements

**The good news:** Almost anything works.

**Minimum viable setup:**
- Any x86_64 computer (Intel/AMD) from the last 15 years (my laptop with i3-2310m and 8gb ram works flawlessly even with 30 containers)
- 4GB RAM (8GB recommended if you want to run multiple apps)
- 30GB storage (but really, get a cheap SSD - spinning rust is painfully slow)
- Ethernet connection (WiFi works but ethernet is rock solid and recommended)

**Actually decent setup:**
- Intel NUC, old laptop, or mini PC
- 8GB+ RAM
- SSD for the OS, big HDD for storage
- Wired ethernet to your router
- dGPU for AI workloads and hardware acceleration (optional) 


CasaOS also runs on Raspberry Pi 4/5 (ARM64), but this guide focuses on x86 since that is what most people have lying around.

---

## Part 1: Installing Ubuntu Server

### Step 1: Download and Flash

1. Grab **Ubuntu Server LTS** from [ubuntu.com/download/server](https://ubuntu.com/download/server)
   - **Do NOT download Ubuntu Desktop.** The GUI is useless for a server and wastes resources.
   - Server edition is just a command line - you control it remotely via SSH.

2. Flash the ISO to a USB stick using [Ventoy](https://www.ventoy.net/en/index.html) or [Rufus](https://rufus.ie/)

3. Plug the USB into your soon-to-be server and boot from it (usually F12, F2, or Del during startup.)

### Step 2: The Installation Walkthrough

Most of this is just hitting Enter, but pay attention to these screens:

**Language/Keyboard:** Pick your defaults and move on.

**Network Configuration:**
- Just accept the defaults for now (DHCP). We will set a static IP later so your bookmarks do not break when the router reboots.

**Proxy/Archive Mirror:** Skip these unless you know you need them.

**Disk Setup:**
- "Use entire disk" is fine for beginners.
- If you have multiple drives, you might want to manually partition later, but for now, keep it simple. And if have more than one drive plugged in just remove them for now to avoid confusion.

**Profile Setup:**
- **Username:** Pick something you will remember (this is your SSH login).
- **Password:** Make it strong. This is your server - do not use "password123."

**SSH Setup:**
- **CHECK THIS BOX:** "Install OpenSSH server"
- This is crucial. Without it, you will need to keep a monitor plugged into the server forever. With SSH, you can control it from your main PC.

**Featured Server Snaps:** Skip these. CasaOS will handle all the software.

Let it install. When it finishes, remove the USB and reboot.

---

## Part 2: 'Quality of Life' Post-Install Fixes

You now have a black screen with some text. Welcome to Linux. Do not panic - this is where the fun starts.

### Fix #1: Stop the Laptop From Sleeping When You Close the Lid (if your server is a laptop)

If you are using a laptop (which you probably are), closing the lid puts it to sleep. That is the opposite of what we want - we want to close it and shove it on a shelf.

```bash
sudo nano /etc/systemd/logind.conf
```

Find the line that says `HandleLidSwitch`. It probably looks like:
```
#HandleLidSwitch=suspend
```

Change it to:
```
HandleLidSwitch=ignore
```

(Remove the `#` at the start, change `suspend` to `ignore`)

Save: `Ctrl+O`, then `Enter`
Exit: `Ctrl+X`

Apply the change:
```bash
sudo systemctl restart systemd-logind
```

**Test it:** Close the lid. The server should keep humming along.

### Fix #2: Lock Down a Static IP Address

Your router probably gives your server a random IP address via DHCP. That means when you bookmark `192.168.1.45` today, it might be `192.168.1.67` tomorrow. Annoying.

Let us give it a permanent address.

First, find your network interface name:
```bash
ip a
```

Look for something like `enp3s0`, `eth0`, or `ens18`. That is your ethernet port.

Now edit the network config:
```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

You will see something like:
```yaml
network:
  ethernets:
    enp3s0:
      dhcp4: true
  version: 2
```

Change it to (replace `enp3s0` with your actual interface name):
```yaml
network:
  ethernets:
    enp3s0:
      dhcp4: false
      addresses: [192.168.1.50/24]    # Pick an IP in your router's range
      routes:
        - to: default
          via: 192.168.1.1            # Your router's IP (usually .1 or .254)
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8] # Cloudflare + Google DNS
  version: 2
```

Apply it:
```bash
sudo netplan apply
```

Now your server will always be at `192.168.1.50` (or whatever you picked). Write that down.

- you can just skip this and use you hostname but static IPs are more reliable.

---

## Part 3: Installing CasaOS

This is the part where everything gets easy.

CasaOS is a web-based dashboard that makes your server look like a smartphone home screen. It handles all the Docker container management behind the scenes so you do not have to write YAML files or memorize command-line flags.

Run this one command:

```bash
curl -fsSL https://get.casaos.io | sudo bash
```

That is it. Seriously.

The script will:
- Install Docker if it is not there
- Pull the CasaOS containers
- Set up the web interface
- Configure all the networking

Grab a coffee. It takes 2-5 minutes depending on your internet speed.

When it finishes, you will see something like:
```
CasaOS installed successfully!
Access it at: http://192.xxx.xx.xx (your-server-ip)
```

Open your browser and go to that IP address. You will see a welcome screen asking you to create an account.

---

## Part 4: First Steps in CasaOS

### The Dashboard

You will see a clean, card-based interface. Think of it like your phone is home screen, but for server apps.

**Built-in essentials:**
- **Files:** A drag-and-drop file manager. No need for SFTP clients - just use your browser.
- **App Store:** This is where the magic happens.
- **System:** CPU, RAM, and storage monitoring at a glance.
- **Terminal:** Web-based SSH access. Handy for quick commands without opening a separate terminal.

### Installing Your First Apps

Click **"App Store"** in the top right. You will see categories like Media, Utility, Network, etc.

**Day-to-day apps you will actually use:**

1. **OpenWebUI (AI)** - Your own ChatGPT alternative. Pair it with OpenRouter to access free models like Llama 3, Mistral, and Gemma. No subscriptions, no data leaving your network. Great for coding help, writing, brainstorming. or if you have beefy hardware, you can run models fully locally using Ollama.

2. **Jellyfin (Media)** - A personal media server. Stream your movies, music, and photos to any device. No ads, no tracking.

3. **Vaultwarden (Security)** - A lightweight Bitwarden server. Your passwords, notes, and 2FA codes stay on your hardware. Use the Bitwarden apps on your phone and browser. Perfect if you do not trust cloud password managers.

4. **NextCloud (Cloud Storage)** - A self-hosted cloud storage solution. Sync your files, calendars, and contacts across all your devices. Full control, no vendor lock-in.

5. **Pi-hole (Network)** - Network-wide ad blocker. Blocks ads on every device in your house - phones, laptops, smart TVs. Once you use it, you will wonder how you lived without it. (a quick note: only do this if you have your server always on since if your server is off, and all the network traffic will be blocked since the DNS server would be down)

6. **Home Assistant (Smart Home)** - If you have any smart devices (Philips Hue, TP-Link, Nest, etc.), bring them all under one roof. No cloud dependency, full control.

7. **qBittorrent (Downloads)** - A remote torrent client. Obviously. Reliable, fast, and runs headless.
Click any app, hit "Install," and CasaOS handles the Docker configuration automatically. It even picks reasonable default ports and storage locations.

#### 3rd Party apps worth mentioning (you need to manually add these via "Custom App")

1. **[Steam Headless](https://github.com/Steam-Headless/docker-steam-headless) (Gaming)** - this is bit tricky to set up but worth it if you have multiple gaming PCs or you want remote download. Caches Steam game updates locally so you only download once. If you want i will make a separate guide for this. If you setup gpu passthrough you can even game stream from your server.


### The Storage Setup

By default, CasaOS stores app data in `/DATA/AppData` and suggests putting your media in `/DATA/Media`.

**If you have multiple drives:**
- Mount your big storage drive somewhere like `/mnt/storage`
- In each app is settings, change the volume mounts to point there
- For example, OpenWebUI is data folder could be `/mnt/storage/ai-data` instead of the default

**Pro tip:** The CasaOS Files app can mount external drives and network shares (SMB/NFS) through the UI. No command line required.

---

## Part 5: Remote Access (Optional but Recommended)

Right now, you can only access CasaOS from your home network. Let us fix that.

### Option 1: Tailscale (Easiest and Safest)

Tailscale creates a private mesh VPN. Your devices get permanent IP addresses that work from anywhere.

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

It will give you a link to authenticate. Do that, and now you can access your server via its Tailscale IP (something like `100.x.x.x`) from anywhere in the world. No port forwarding, no security holes.

Your phone on 5G? Connect to Tailscale and access your server as if you were home. Your passwords, your AI, your games - all accessible anywhere.

### Option 2: Cloudflare Tunnels (If you want a custom domain, a bit complex to set up)

Want to access your server at `https://ai.yourdomain.com`? Use Cloudflare Tunnels (formerly Argo).

It is free and routes traffic through Cloudflare is network, hiding your real IP address.

CasaOS has Cloudflared in the App Store, but configuring it requires a Cloudflare account and some DNS setup. Worth it if you are comfortable with that.

- i will make a separate guide since it is bit long to explain here.

---

## Part 6: Maintenance and Troubleshooting

### Updating CasaOS

CasaOS does not auto-update (which is good - you do not want surprise changes on a server).

Check for updates in the CasaOS System panel. One click to update.

### Updating Apps

Individual apps update through the CasaOS interface too. Look for the orange "Update" badge on app icons.

Or enable [Watchtower](https://containrrr.dev/watchtower/) (available in the App Store) to auto-update containers. Just be careful - some apps (like databases) should not auto-update.

### Common Issues

**"I cannot access CasaOS after install"**
- Check if CasaOS is running: `sudo systemctl status casaos`
- If not, start it: `sudo systemctl start casaos`
- Check firewall: `sudo ufw status` (might need to allow port 80/443)

**"Apps will not start"**
- Check Docker is running: `sudo systemctl status docker`
- Check port conflicts: Two apps cannot use the same port
- Check disk space: `df -h`

**"My laptop/server keeps sleeping"**
- Double-check the lid switch fix from [Part 2](#part-2-installing-casaos-on-ubuntu)
- Also check power settings: `sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target`

**"OpenWebUI is slow"**
- The free models from OpenRouter are not local - they require internet
- For truly local AI, you need to install Ollama or LM Studio (more RAM required)
- A 7B model needs at least 6-8GB vRAM to run decently

---

## Part 7: Beyond CasaOS (When You Are Ready to Level Up)

CasaOS is perfect for starting out. But eventually, you might want more control.

I will make a separate guide for migrating away from CasaOS if you want to do that but for most people, CasaOS is more than enough.

**The next steps:**

1. **Dockge** - Still has a web UI, but stores everything as plain Docker Compose files. Git-friendly.

2. **Portainer** - The pro container manager. More complex but infinitely flexible.

3. **Docker Compose manually** - Write your own YAML files. Full control, fully portable.

The beauty is: since CasaOS uses Docker under the hood, all your app data is already in standard containers. You can migrate away from CasaOS anytime without losing anything.

---

## Quick Reference Commands

```bash
# Check CasaOS status
sudo systemctl status casaos

# Restart CasaOS
sudo systemctl restart casaos

# Check Docker containers
docker ps

# View app logs
docker logs <container-name>

# Restart an app
docker restart <container-name>

# Check disk space
df -h

# Check memory usage
free -h

# Update all packages
sudo apt update && sudo apt upgrade -y
```

---

## Final Thoughts

You now have a proper home server running on hardware that was destined for a landfill. That is pretty cool.

Start simple: Install OpenWebUI, grab an OpenRouter key, and play with your new AI. Set up Vaultwarden and import your passwords from whatever you are using now. Add Pi-hole and watch the ads disappear from your entire network. Stream your media with Jellyfin. 

Once you are comfortable, dig into the Docker containers CasaOS created for you. Look at the volume mappings, the environment variables, the port bindings. That is how you learn.

And remember: this is *your* server. It runs what you want, how you want it. No subscriptions, no data mining, no "your account has been suspended." Just you, your hardware, and infinite possibilities.

Welcome to self-hosting.

---

## Resources
- **Ubuntu Server Download:** [ubuntu.com/download/server](https://ubuntu.com/download/server)
- **CasaOS Official:** [casaos.zimaspace.com](https://casaos.zimaspace.com)
- **GitHub:** [github.com/IceWhaleTech/CasaOS](https://github.com/IceWhaleTech/CasaOS)
- **Discord Community:** [discord.gg/Gx4BCEtHjx](https://discord.gg/Gx4BCEtHjx)
- **Docker Hub:** [hub.docker.com](https://hub.docker.com) (for finding custom apps not in the store)
- **OpenRouter:** [openrouter.ai](https://openrouter.ai) (free AI models API)
- **Vaultwarden GitHub:** [github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- **Jellyfin Official:** [jellyfin.org](https://jellyfin.org)
- **NextCloud Official:** [nextcloud.com](https://nextcloud.com)
- **Pi-hole Official:** [pi-hole.net](https://pi-hole.net)
- **Tailscale Official:** [tailscale.com](https://tailscale.com)
- **Cloudflare Tunnels:** [developers.cloudflare.com/cloudflare-one/connections/connect-apps/](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- **Steam Headless GitHub:** [github.com/Steam-Headless/docker-steam-headless](https://github.com/Steam-Headless/docker-steam-headless)
- **Ollama Official:** [ollama.com](https://ollama.com)

*Last updated: February 2026*
