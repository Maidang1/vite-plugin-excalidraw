import type { Plugin } from 'vite'
import { createPluginName } from './shared/create'
import fs from 'fs';
interface Options {
	extensions?: string[]
}

const useName = createPluginName()

const usePlugin = (options?: Partial<Options>): Plugin => {

	const { extensions = ['.excalidraw'] } = options || {}

	return {
		name: useName('name'),

		resolveId(id) {
			if (extensions.some(ext => id.endsWith(ext))) {
				return id
			}
		},
		async load(id, options) {
			if (extensions.some(ext => id.endsWith(ext))) {
				try {
					const content = fs.readFileSync(id, {
						encoding: 'utf-8'
					})
					const json = JSON.parse(content)
					const { elements, appState, files } = json;
					return `
					 import { Excalidraw } from "@excalidraw/excalidraw";
					 import React from 'react';
					 const Draw = () => {
					 	const initialData = {
						  elements:${JSON.stringify(elements ?? [])},
							appState:${JSON.stringify(appState ?? {})},
							scrollToContent: true
						}
						const UIOptions= { canvasActions: { loadScene: false, saveScene: false, saveAsScene: false, clearCanvas: false } }
					  return React.createElement(Excalidraw, { initialData, UIOptions, viewModeEnabled:true });
					 };
					export default Draw;
					`
				} catch (error) {
					console.error("error", error)
					return null
				}
			}
			return null
		},
	}
}

export default usePlugin
