# Thumbhash

[![Module Version](https://img.shields.io/hexpm/v/thumbhash.svg)](https://hex.pm/packages/thumbhash)
[![Hex Docs](https://img.shields.io/badge/hex-docs-lightgreen.svg)](https://hexdocs.pm/thumbhash/)

This is a pure Elixir implementation of [ThumbHash](https://github.com/evanw/thumbhash).

[中文教程](https://blog.hentioe.dev/posts/elixir-thumbhash.html)

## Current status

Which only implements the encoding-related APIs, without decoding functionality. **During the alpha release phase, the API may undergo incompatible changes.**

running 'mix thumbhash.install' will download thumbhash.js install it to the assets/vendor directory, install the hook into the assets/hooks directory
to decode the hash add the hook to your liveview hooks and add the data-thumbhash={@thumbhash} to the corresponding img element ex.  <img class="pt-1" id="main_image" src={@url} width="150" height="100" data-thumbhash={@thumbhash} phx-hook="ThumbHash" />

you will also need to import the library into your app js

## Preview

| File       |                                      Original                                       |                                           Placeholder                                            | base64                         |
| ---------- | :---------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | ------------------------------ |
| flower.jpg | ![Origin image](https://github.com/Hentioe/thumbhash-ex/blob/master/img/flower.jpg?raw=true) | ![ThumbHash image](https://github.com/Hentioe/thumbhash-ex/blob/master/img/flower-thumbhash.png?raw=true) | `k0oGLQaSVsN0BVhn2oq2Z5SQUQcZ` |

## Installation

Add Thumbhash to your `mix.exs` dependencies:

```elixir
def deps do
  [
    {:thumbhash, "~> 0.1.0-alpha.0"},
  ]
end
```

## Usage

Example (use [`Image`](https://github.com/elixir-image/image) to get image data):

```elixir
image = Image.open!(Path.join("img", "flower.jpg"))

rgba =
  if Image.has_alpha?(image) do
    {:ok, data} = Vix.Vips.Image.write_to_binary(image)
    :binary.bin_to_list(data)
  else
    image = Image.add_alpha!(image, 255) # If there is no alpha channel, add a fixed value of 255.

    {:ok, data} = Vix.Vips.Image.write_to_binary(image)
    :binary.bin_to_list(data)
  end

bin = Thumbhash.rgba_to_thumb_hash(75, 100, :array.from_list(rgba))

# Encode the data as a string (base64).
Base.encode64(bin) # => "k0oGLQaSVsN0BVhn2oq2Z5SQUQcZ"
```

As shown in the code above, you have to get the RGBA data of the image manually, as this library only performs calculations and does not handle image files.

Additionally, you cannot lose the alpha channel data. Even for non-transparent images, the alpha value must be filled in for every pixel.

## Benchmark

```plaintext
Name                           ips        average  deviation         median         99th %
rgba_to_thumb_hash/3         55.17       18.13 ms    ±16.46%       16.57 ms       28.34 ms
```
